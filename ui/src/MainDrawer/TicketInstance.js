import React, { Fragment, useState, useEffect } from "react";
import API from "../API_Interface/API_Interface";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Grid
} from "@mui/material";
import Stack from '@mui/joy/Stack';
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';

const Fields = (props) => {
  //const [fieldTags, setFieldTags] = useState([]);
  const [allFieldTags, setAllFieldTags] = useState([]);
  const [fields, setFields] = useState([]);
  const [description, setDescription] = useState("");
  const templateID = props.ticket.templateID;

  useEffect(() => {
    const api = new API();
    console.log("template id ", props.ticket.templateID);

    async function getFields() {
      const routesJSONString = await api.getTemplateFieldsByID(
        props.ticket.templateID
      );
      console.log(`Fields from the DB ${JSON.stringify(routesJSONString)}`);

      setFields(
        routesJSONString.data.map((ticket) => ({
          fieldtagID: ticket.fieldtagID,
          field: ticket.field,
          tag: ticket.tag,
          fromTemplate: true,
        }))
      );
    }
    async function getFieldTags() {
      const routesJSONString = await api.getAllFieldTags();
      console.log(
        `All Fields tags from the DB ${JSON.stringify(routesJSONString)}`
      );
      setAllFieldTags(routesJSONString.data);
    }

    getFields();
    getFieldTags();
  }, [templateID]);

  const title = props.ticket.title;
  const info = props.ticket.info;
  

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setSelectedTags(fields);
    console.log("selectedTags ", selectedTags);
  }, [fields]);

  const handleTagChange = (event, index) => {
    const newSelectedTags = [...selectedTags];
    newSelectedTags[index].tag = event.target.value;

    const matchingFieldTag = allFieldTags.find(
      (fieldTag) =>
        fieldTag.field === newSelectedTags[index].field &&
        fieldTag.tag === event.target.value
    );

    if (matchingFieldTag) {
      newSelectedTags[index].fieldtagID = matchingFieldTag.fieldtagID;
    }

    setSelectedTags(newSelectedTags);
  };

  const getMenuItems = (field) => {
    const matchingFieldTags = allFieldTags.filter((fieldTag) => fieldTag.field === field);

    return matchingFieldTags.map((fieldTag) => (
      <MenuItem key={fieldTag.tag} value={fieldTag.tag}>
        {fieldTag.tag}
      </MenuItem>
    ));
  };

  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const selectedFields = fields.map((field, idx) => ({
      fieldtagID: field.fieldtagID,
      field: field.field,
      tag: selectedTags[idx],
    }));

    const formData = {
      selectedFields: selectedFields
    };

    console.log(JSON.stringify(formData));
    
    const api = new API();
    const ticketData = {
      userID: props.userID,
      title: title,
      info: description,
    };
    
    const ticketFieldArray = selectedFields.map((field) => field.fieldtagID);
    
    console.log(
      "Attempt to create ticket instance with: ",
      ticketData,
      ", ",
      ticketFieldArray
    );
    
    try {
      const response = await api.createTicketInstance(ticketData, ticketFieldArray);
      console.log("Ticket instance created:", response);
    } catch (error) {
      console.error("Error creating ticket instance:", error);
    }
    props.setRerender();
    props.handlePageClear();
  };

  const handleAddField = (field) => {
    setFields([
      ...fields,
      {
        field,
        fieldtagID: null,
        tag: "",
        fromTemplate: false,
      },
    ]);
  };

  const getAvailableFieldsToAdd = () => {
    const availableFields = allFieldTags
      .map((fieldTag) => fieldTag.field)
      .filter((field, index, self) => self.indexOf(field) === index);

    return availableFields.filter(
      (field) => !fields.some((f) => f.field === field)
    );
  };
  async function deleteTemplate(){
    const api = new API();
    const templateID = props.ticket.templateID;
    console.log(templateID);
    api.deleteTemplate(templateID);
    props.setRerender();
    props.handlePageClear();
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ color: "text.primary" }}>
        {info}
      </Typography>
      <Stack spacing={3} direction = "row" justifyContent={"space-between"}>
        <TextField label="Description" id="outlined-textarea" sx={{width: "65vh"}} multiline variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <Stack>
          {fields.map((field, index) => (
            <Box
              key={index}
              sx={{
              display: "flex",
              alignItems: "center",
              my: 1,
              p: 1,
              border: "2px solid",
              backgroundColor:"#F5F5F5",
              borderColor: "secondary.main",
              }}>
            <Typography sx={{ mr: 1, color: "text.primary" }}>
              {field.field}:
            </Typography>
              {field.fromTemplate ? (
            <Fragment>
              <LockIcon sx={{ mr: 1 }} />
              <Typography>{field.tag}</Typography>
            </Fragment>
            ) : (
            <Fragment>
              <FormControl sx={{width: "40vh"}}>
              <InputLabel id="tag-selector">Tag</InputLabel>  
              <Select sx={{backgroundColor:"#F5F5F5"}} labelId="tag-selector" id="tag-select" label="tag"
                value={selectedTags[index] ? selectedTags[index].tag : null}
                onChange={(event) => handleTagChange(event, index)}
              >
                {getMenuItems(field.field)}
              </Select>
              </FormControl>
              <IconButton
                edge="end"
                onClick={() => handleDeleteField(index)}
                sx={{ ml: 1, color:"secondary.main"}}
                    >
                  <DeleteIcon />
                </IconButton>
            </Fragment>
          )}
        </Box>
      ))}
    <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
      {getAvailableFieldsToAdd().length > 0 &&
      <FormControl  sx={{width: "40vh"}} >
        <InputLabel id="field-selector">Field</InputLabel>     
        <Select labelId="field-selector" id="field-select" label="field" onChange={(event) => handleAddField(event.target.value)}>
          {getAvailableFieldsToAdd().map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>}
    </Box>
    </Stack>
    </Stack>
    <Stack direction = "column" spacing={2} alignItems="center" justifyContent="center">
      <Button onClick={handleFormSubmit} variant="contained">
        Submit
      </Button>
      <Button sx= {{display: props.userRole === 'admin' ? 'inline' : 'none' }} variant="contained" color="secondary" onClick={() => deleteTemplate()}>
        Delete Template
      </Button>
    </Stack>
  </Box>
);
};

export default Fields;