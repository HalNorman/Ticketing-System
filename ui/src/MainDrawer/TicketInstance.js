import React, { Fragment, useState, useEffect } from "react";
import API from '../API_Interface/API_Interface';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";



const Fields = (props) => {
 

  const[fieldTags, setFieldTags] = useState([]);
  const[allFieldTags, setAllFieldTags] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const api = new API();

    async function getFields() {
      const routesJSONString = await  api.getTemplateFieldsByID(props.ticket.ticketID);
      console.log(`Fields from the DB ${JSON.stringify(routesJSONString)}`);

      setFields(routesJSONString.data.map((ticket) => ({
        fieldtagID: ticket.fieldtagID,
        field: ticket.field,
        tag: ticket.tag,
      })));
    
  }
    async function getFieldTags() {
      const routesJSONString = await  api.getAllFieldTags(props.ticket.ticketID);
      console.log(`All Fields tags from the DB ${JSON.stringify(routesJSONString)}`);
      setAllFieldTags(routesJSONString.data);
    }

    getFields();
    getFieldTags();
}, []);
 

  useEffect(() => {
    
    // extract fieldtagID values from fields array
    const fieldTagIDs = fields.map((field) => field.fieldtagID);

    // filter field tags by fieldTagID and templateID
    const filteredFieldTags = allFieldTags.filter((fieldTag) =>
      fieldTagIDs.includes(fieldTag.fieldtagID)// && fieldTag.templateID === templateID
    );

    const newfieldTags = {
      fieldtags: fields.map((field, index) => ({
        fieldtagID: field.fieldtagID,
        field: field.field,
        tags: allFieldTags.filter(obj => obj.field === field.field).map(obj => obj.tag)
      }))
    };
    setFieldTags(newfieldTags);

  }, [fields, allFieldTags]);



  const title = props.ticket.title;
  const info =  props.ticket.info;

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setSelectedTags(fields);
     console.log("selectedTags ", selectedTags);
  
  }, [fields]);



  const handleTagChange = (event, fieldtagID) => {
    const newSelectedTags = { ...selectedTags };
    newSelectedTags[fieldtagID].tag = event.target.value;

    console.log("index ", fieldtagID, " value ",  event.target.value);
    setSelectedTags(newSelectedTags);
  };


  const getMenuItems = (fieldtagID) => {
    if (fieldTags.length === 0) return null;
    const matchingField = fieldTags.fieldtags.find(
      (field) => field.fieldtagID === fieldtagID
    );

    if (!matchingField) return null;

    return matchingField.tags.map((tag) => (

      <MenuItem key={tag} value={tag}>
        {tag}

      </MenuItem>
    ));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const selectedFields = fields.map((field, idx) => ({
      fieldtagID: field.fieldtagID,
      field: field.field,
      tag: selectedTags[idx],
    }));

    const formData = {
      selectedFields: selectedFields,
    };

    console.log(JSON.stringify(formData));
  };

  return (
    <Box >
      <Typography variant="h3" sx={{color: "text.primary"}}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{color: "text.primary"}}>
        {info}
      </Typography>
      {fields.map((field, index) => (
        <Box
          key={field.fieldtagID}
          sx={{
            display: "flex",
            alignItems: "center",
            my: 1,
            p: 1,
            border: "2px solid",
            borderColor: "secondary.main"
          }}
        >
          <Typography sx={{ mr: 1, color: "text.primary" }}>
            {field.field}:
          </Typography>
          <Select
            value={selectedTags[index]?  selectedTags[index].tag: null}
            onChange={(event) => handleTagChange(event, index)}
          >
            {getMenuItems(field.fieldtagID)}
          </Select>
        </Box>
      ))}
      <Button onClick={handleFormSubmit} variant="contained" >
        Submit
      </Button>
    </Box>
  );
};

export default Fields;