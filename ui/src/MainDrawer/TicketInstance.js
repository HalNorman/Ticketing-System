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
  const[template, setTemplate] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const api = new API();


    async function getTemplate() {
      const routesJSONString = await  api.getTemplateFieldsByID(props.ticket.ticketID);
      console.log(`Fields from the DB ${JSON.stringify(routesJSONString)}`);
      setTemplate(routesJSONString.data);
    
  }

    async function getFieldTags() {
      const routesJSONString = await  api.getAllFieldTags(props.ticket.ticketID);
      console.log(`All Fields from the DB ${JSON.stringify(routesJSONString)}`);
      setAllFieldTags(routesJSONString.data);
    
  }
    getTemplate();
    getFieldTags();
}, []);



  useEffect(() => {
    
    setFields  (template.map((ticket) => ({
      fieldtagID: ticket.fieldtagID,
      field: ticket.field,
      tag: ticket.tag,
    })));
   // console.log("jenfjfn ", template);

    const api = new API();

  


  async function getFieldTags(fields) {
    const routesJSONString = await api.getAllFieldTags();
    console.log(`Field Tags from the DB ${JSON.stringify(routesJSONString)}`);
  
    // extract fieldtagID values from fields array
    const fieldTagIDs = fields.map((field) => field.fieldtagID);
  
    // filter field tags by fieldTagID and templateID
    const filteredFieldTags = routesJSONString.data.filter((fieldTag) =>
      fieldTagIDs.includes(fieldTag.fieldtagID)// && fieldTag.templateID === templateID
    );
  
    // extract tag values from filtered field tags
    const tags = filteredFieldTags.map((fieldTag) => fieldTag.tag);
  
    // set tags in state
    setFieldTags(filteredFieldTags);

   
    const newfieldTags = {
      fieldtags: fields.map((field, index) => ({
        fieldtagID: field.fieldtagID,
        field: field.field,
        tags: allFieldTags.filter(obj => obj.field === field.field).map(obj => obj.tag)
      }))
    };
    setFieldTags(newfieldTags);
   // setAllFieldTags(fields);

    console.log("fields ", fields);
    console.log("field tags ids", fieldTagIDs);
    console.log("filtered field tags ", filteredFieldTags);
    console.log("tags ", tags);
    console.log("new field tags ", newfieldTags);
    console.log("all field tags ", allFieldTags);
  }
 
    // console.log("fields: ", fields)
    // console.log("template: ", template)

   getFieldTags(fields)
}, [template, allFieldTags]);




  const title = props.ticket.title;
  const info =  props.ticket.info;



 
  // const [selectedTags, setSelectedTags] = useState(
  //   fields.reduce((obj, field) => {
  //     obj[field.fieldtagID] = field.tag;
  //     return obj;
  //   }, {})
  // );

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
    console.log("fieldtagss ", fieldTags);
    console.log("fieldtag id ", fieldtagID);
    console.log("match ", matchingField);
    if (!matchingField) return null;

  
    return (
      matchingField && matchingField.tags ? (
        matchingField.tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No tags found</MenuItem>
      )
    );



    return matchingField.tags.map((tag) => (
      <MenuItem key={tag.tag} value={tag.tag}>
        {tag.tag}
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
    <Fragment>
      <Typography variant="h3">
        {title}
      </Typography>
      <Typography variant="h5">
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
            border: "1px solid lightgray",
          }}
        >
          <Typography sx={{ mr: 1 }}>
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
      <Button onClick={handleFormSubmit} variant="contained">
        Submit
      </Button>
    </Fragment>
  );
};

export default Fields;