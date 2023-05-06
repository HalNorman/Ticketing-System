import React, { useState, useEffect } from 'react';
import API from '../API_Interface/API_Interface';
import { Box, Collapse, Button, TextField, Typography, Divider } from '@mui/material';
import Stack from '@mui/joy/Stack';
import Snack from "../HomePage/SnackBar";

export default function FieldForm() {
  const [fields, setFields] = useState([]);
  const [openField, setOpenField] = useState(null);
  const [fieldInput, setFieldInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [reRender, setReRender] = useState(0);
  const [openSnack,setOpenSnack] = useState(false);
  const [snackMessage,setSnackMessage] = useState("")


  useEffect(() => {
    const api = new API();

    async function getFieldTags() {
      const routesJSONString = await api.getAllFieldTags();
      setFields(routesJSONString.data);
    }

    getFieldTags();
  }, [reRender]);

  async function handleDeleteFieldTag(fieldID) {
    const api = new API();
    const response = await api.deleteFieldTag(fieldID);
    setReRender(reRender + 1);
    setSnackMessage("FieldTag Deleted");
    setOpenSnack(true);
  }

  async function handleAddFieldAndTag2() {
    if(fieldInput === ''){
      setSnackMessage("Field empty");
      setOpenSnack(true);
    }
    else if (tagInput === ''){
      setSnackMessage("Tag empty");
      setOpenSnack(true);
    }
    else {
      const api = new API();
      const fieldTagExists = (fields.find((fieldtag) => fieldtag.field === fieldInput && fieldtag.tag === tagInput));
      if(!fieldTagExists){
        const result = await api.addFieldTag({field: fieldInput, tag: tagInput});
        setReRender(reRender + 1);
        setSnackMessage("Added Field Tag");
        setOpenSnack(true);
      }else{
        setSnackMessage("Tag Already Exists");
        setOpenSnack(true);
      }
    }
  }

  function handleClear(){
    setFieldInput('');
    setTagInput('');
  }
  function handleToggleFieldTags(field) {
    setOpenField((prevOpenField) => (prevOpenField === field ? null : field));
  }

  const uniqueFields = Array.from(
    new Set(fields.map((fieldTag) => fieldTag.field))
  );
    //divider={<Divider orientation="horizontal" />}
  return (
    <Box sx= {{flexGrow:1, p: 3 }}  >
    <Box sx={{my:8, flexDirection: "up",marginLeft: "5px"}}>
    <Stack direction="column" spacing={2} justifyContent="center">
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField id="Field" label="Field" variant="outlined" value={fieldInput} onChange={(event) => setFieldInput(event.target.value)}/>
        <TextField id="Tag" label="Tag" variant="outlined" value={tagInput} onChange={(event) => setTagInput(event.target.value)}/>
        <Button onClick={() => handleAddFieldAndTag2()} variant="contained" color="secondary">Add</Button>
        <Button onClick={() => handleClear()} variant="contained" color="secondary">Clear</Button>
      </Stack>
        <Box>
        </Box>
          {uniqueFields.map((field) => (
            <Stack direction="column" spacing={2} justifyContent="center" key={field}>
              <Box>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Button onClick={() => handleToggleFieldTags(field)} variant="outlined" color="secondary">
                    {field}
                  </Button>
                </Stack>
              </Box>
                <Collapse in={openField === field}>
                  <Stack direction="column" spacing={2} justifyContent="center" >
                    {fields.filter((fieldTag) => fieldTag.field === field).map((fieldTag) => (
                      <Box>
                        <Stack direction="row" spacing={2} justifyContent="center" key={fieldTag.fieldtagID}>
                          <Typography spacing={2}> {fieldTag.tag} </Typography>
                          <Button onClick={() => handleDeleteFieldTag(fieldTag.fieldtagID)} variant="contained" color="secondary">Delete Tag</Button>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Collapse>
            </Stack>
        ))}
        </Stack>
      </Box>
      <Snack open={openSnack} setOpen={setOpenSnack} message={snackMessage}/>
    </Box>
  );
}


