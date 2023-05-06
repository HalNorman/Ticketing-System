import React, { useState, useEffect, Fragment } from 'react';
import API from '../API_Interface/API_Interface';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import Stack from '@mui/joy/Stack';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import Snack from "../HomePage/SnackBar";

function GenericTemplate(props) {
  const [fields, setFields] = useState([]);
  const [selectedFieldTags, setSelectedFieldTags] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [openSnack,setOpenSnack] = useState(false);
  const [snackMessage,setSnackMessage] = useState("")

  const displayFieldTags = fields.filter((fieldtag) => !(selectedFieldTags.some((selectedFieldTag) => fieldtag.field === selectedFieldTag.field)));
      let fieldStringArray = [];
      displayFieldTags.forEach(element => {
        if(!fieldStringArray.includes(element.field)){
          fieldStringArray.push(element.field);
        }
      });

  useEffect(() => {
    const api = new API();

    async function getFieldTags() {
      const routesJSONString = await api.getAllFieldTags();
      console.log(routesJSONString.data);
      setFields(routesJSONString.data);
    }

    getFieldTags();
  }, []);

  async function handleSubmit(){
    console.log(`handle submit called with ${title} and ${info}`);
    if(title !== '' && info !== ''){
      const api = new API();
      const fieldtagArray = selectedFieldTags.map((object) => object.fieldtagID);
      console.log(fieldtagArray);
      await api.createTicketInstance({userID: props.user.userID, title:title, info:info}, fieldtagArray);
      setSelectedField('');
      setSelectedFieldTags([]);
      setTitle('');
      setInfo('');
      props.handleRerender();
      setSnackMessage("Creating Template");
      setOpenSnack(true);
    }
  }
  
  function handleRemove(fieldTag){
    let newSelectedFieldTags = [...selectedFieldTags];
    newSelectedFieldTags = newSelectedFieldTags.filter((object) => object.fieldtagID !== fieldTag.fieldtagID);
    console.log(newSelectedFieldTags);
    setSelectedFieldTags(newSelectedFieldTags);
  }
  
  function displaySelectedFields(){
    return <Fragment> 
            {selectedFieldTags.length > 0 && 
              selectedFieldTags.map((object) => {
                return <Stack spacing={3} direction = "row" justifyContent={"center"}>
                          <Stack item>
                          <Box 
                            key={object.field}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              //could do 
                              my: 1,
                              border: "2px solid",
                              borderColor: "secondary.main"
                              }}
                            >
                            <Paper sx={{ p: 2, margin: 'auto', minWidth: 300, maxWidth: 600, flexGrow: 1, backgroundColor: '#f5f5f5', }}>
                              <Typography sx={{ mr: 1, color: "text.primary" }}>
                                {object.field + ": " }
                              </Typography>
                            </Paper>
                          </Box>
                          </Stack>
                          <Stack item>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              //could do 
                              my: 1,
                              border: "2px solid",
                              borderColor: "secondary.main"
                              }}
                            >
                            <Paper sx={{ p: 2, margin: 'auto', minWidth: 300, maxWidth: 600, flexGrow: 1, backgroundColor: '#f5f5f5', }}>
                              <Typography sx={{ mr: 1, color: "text.primary" }}>
                                {object.tag}
                              </Typography>
                            </Paper>
                          </Box>
                          </Stack>
                          <Stack item>
                            <IconButton
                              onClick={() => handleRemove(object)}
                              sx={{color:"secondary.main", my:1}}
                            >
                              <DeleteIcon />
                            </IconButton>
                        </Stack>
                      </Stack>
              })
            }
          </Fragment>
  }
  function tagSelected(fieldTag){
    let newSelectedFieldTags = [...selectedFieldTags];
    newSelectedFieldTags.push(fieldTag);
    setSelectedFieldTags(newSelectedFieldTags);
    setSelectedField('');
    console.log(selectedFieldTags);
  }


  function displaySelector(){
    console.log(selectedField);
    if(selectedField !== ''){
      const tagArray = fields.filter((fieldTag) => fieldTag.field === selectedField);
      return <Fragment>
                <Stack spacing={3} direction = "row" justifyContent={"center"}>
                  <Box
                    sx={{
                        display: "flex",
                        alignItems: "center", 
                        my: 1,
                        border: "2px solid",
                        borderColor: "secondary.main"
                        }}
                        >
                      <Paper sx={{ p: 2, margin: 'auto', minWidth: 300, maxWidth: 600, flexGrow: 1, backgroundColor: '#f5f5f5', }}>
                        <Typography sx={{ mr: 1, color: "text.primary" }}>
                          {selectedField + " : "}
                        </Typography>
                      </Paper>
                    </Box>
                <FormControl sx={{width: "20vh"}}> 
                  <InputLabel id="tagSelector" sx={{marginTop: 1}}>Tag</InputLabel>
                    <Select 
                        sx={{marginTop: 1}}
                        fullWidth
                        labelId="tagSelector"
                        id="tagSelect"
                        label="tag"
                        onChange={(event) => tagSelected(event.target.value)}
                        >
                        {tagArray.map((fieldTag) => (
                          <MenuItem value={fieldTag}>
                            {fieldTag.tag}
                          </MenuItem>)
                        )}
                  </Select>
                  </FormControl>
                </Stack>
             </Fragment>
    } 
    else if(displayFieldTags.length > 0) {
      console.log(fieldStringArray);
      return <Fragment>
              <Stack spacing={3} direction = "row" justifyContent={"space-between"}>
                <FormControl sx={{width: "20vh"}}>
                  <InputLabel id="fieldSelector">Field</InputLabel>
                    <Select 
                        fullWidth
                        labelId="fieldSelector"
                        id="fieldSelect"
                        label="field"
                        value="field"
                        onChange={(event) => setSelectedField(event.target.value)}
                        >
                        {fieldStringArray.map((fieldString) => (
                          <MenuItem value={fieldString}>
                            {fieldString}
                          </MenuItem>
                        )
                        )}
                    </Select>
                </FormControl>
              </Stack>
             </Fragment>
    }
    else{
      return <Fragment>
                
             </Fragment>
    }
  }
  return (
    <div>
      <h1>Create a New Ticket</h1>
        <Stack spacing={3} direction = "column" alignItems="center" justifyContent={"space-between"}>
        <TextField
          label="Title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ mb: 2, width: "40vh" }}
        />
        <br />
        <TextField
          label="Info"
          value={info}
          onChange={(event) => setInfo(event.target.value)}
          multiline variant="outlined"
          sx={{ mb: 4, width: "40vh" }}
        />
        {displaySelectedFields()}
        {displaySelector()}
        <Button onClick={handleSubmit} type="submit" variant="contained" color='secondary' sx={{ backgroundColor:'secondary.main' }}>Submit</Button>
        </Stack>
        <Snack open={openSnack} setOpen={setOpenSnack} message={snackMessage}/>
    </div>
  );
}

export default GenericTemplate;