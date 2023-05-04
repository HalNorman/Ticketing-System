import React, { Fragment, useState, useEffect } from "react";
import API from '../API_Interface/API_Interface';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  TextField
} from "@mui/material";
import Stack from '@mui/joy/Stack';



const Fields = (props) => {

  console.log( "this is the ticket: " + JSON.stringify(props.ticket));
 

  const[fieldTags, setFieldTags] = useState([]);
  const[allFieldTags, setAllFieldTags] = useState([]);
  const[fields, setFields] = useState([]);
  // const[ticketID, setTicketID] = useState([props.ticket.ticketID]);

  const title = props.ticket.title;
  const info =  props.ticket.info;
  const ticketID = props.ticket.ticketID;

  console.log("fields: " + JSON.stringify(fields));
  console.log("ticketID: " + JSON.stringify(ticketID));


  useEffect(() => {
    const api = new API();

    async function getFields() {
      const routesJSONString = await  api.getTicketByID(props.ticket.ticketID);
      console.log(`Ticket by ticket ID: ${props.ticket.ticketID}, ${JSON.stringify(routesJSONString)}`);

      setFields(routesJSONString.data.map((ticket) => ({
        field: ticket.field,
        tag: ticket.tag,
      })));
    
    }

    getFields();
}, [ticketID]);







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
      <Stack direction="column">
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
              {field.field}: {field.tag}
            </Typography>
          </Box>
        ))}
    </Stack>
  </Box>
  );
};

export default Fields;