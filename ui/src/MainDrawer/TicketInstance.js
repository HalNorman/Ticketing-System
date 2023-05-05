import React, { Fragment, useState, useEffect } from "react";
import API from "../API_Interface/API_Interface";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Paper,
  MenuList,
  Button,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Fields = (props) => {
  const [fieldTags, setFieldTags] = useState([]);
  const [allFieldTags, setAllFieldTags] = useState([]);
  const [fields, setFields] = useState([]);
  const [description, setDescription] = useState("");

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
  }, []);

  useEffect(() => {
    // extract fieldtagID values from fields array
    const fieldTagIDs = fields.map((field) => field.fieldtagID);

    // filter field tags by fieldTagID and templateID
    const filteredFieldTags = allFieldTags.filter((fieldTag) =>
      fieldTagIDs.includes(fieldTag.fieldtagID)
    );

    const newfieldTags = {
      fieldtags: fields.map((field, index) => ({
        fieldtagID: field.fieldtagID,
        field: field.field,
        tags: allFieldTags
          .filter((obj) => obj.field === field.field)
          .map((obj) => obj.tag),
      })),
    };
    setFieldTags(newfieldTags);
  }, [fields, allFieldTags]);

  const title = props.ticket.title;
  const info = props.ticket.info;

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setSelectedTags(fields);
    console.log("selectedTags ", selectedTags);
  }, [fields]);

  const handleTagChange = (event, fieldtagID) => {
    const newSelectedTags = { ...selectedTags };
    newSelectedTags[fieldtagID].tag = event.target.value;

    console.log("index ", fieldtagID, " value ", event.target.value);
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
  };

  const handleAddField = (field, tag) => {
  const matchingFieldTag = allFieldTags.find(
  (fieldTag) => fieldTag.field === field && fieldTag.tag === tag
  );
  const fieldtagID = matchingFieldTag ? matchingFieldTag.fieldtagID : null;
  setFields([...fields, { field, fieldtagID, tag, fromTemplate: false }]);
  };
  
  return (
  <Box>
  <Typography variant="h3" sx={{ color: "text.primary" }}>
  {title}
  </Typography>
  <Typography variant="h5" sx={{ color: "text.primary" }}>
  {info}
  </Typography>
  <TextField
  label="Description"
  variant="outlined"
  fullWidth
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  sx={{ my: 2 }}
  />
  {fields.map((field, index) => (
  <Box
  key={field.fieldtagID}
  sx={{
  display: "flex",
  alignItems: "center",
  my: 1,
  p: 1,
  border: "2px solid",
  borderColor: "secondary.main",
  }}
  >
  <Typography sx={{ mr: 1, color: "text.primary" }}>{field.field}:</Typography>
  {field.fromTemplate ? (
  <Fragment>
  <LockIcon sx={{ mr: 1 }} />
  <Typography>{field.tag}</Typography>
  </Fragment>
  ) : (
  <Select
  value={selectedTags[index] ? selectedTags[index].tag : null}
  onChange={(event) => handleTagChange(event, index)}
  >
  {getMenuItems(field.fieldtagID)}
  </Select>
  )}
  </Box>
  ))}
  <AddFieldDropdown
       fields={fields}
       allFieldTags={allFieldTags}
       onAddField={handleAddField}
     />
  <Button onClick={handleFormSubmit} variant="contained">
  Submit
  </Button>
  </Box>
  );
  };
  
  const AddFieldDropdown = ({ fields, allFieldTags, onAddField }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleAddFieldClick = (field, tag) => {
  onAddField(field, tag);
  setShowDropdown(false);
  };
  
  const getFieldTagsForField = (field) => {
  return allFieldTags.filter((fieldTag) => fieldTag.field === field);
  };
  
  return (
  <div>
  <Button onClick={() => setShowDropdown(!showDropdown)} variant="outlined">
  Add Field
  </Button>
  {showDropdown && (
  <Paper>
  <MenuList>
  {fields.map((field) => (
  <MenuItem key={field.field} onClick={(e) => e.stopPropagation()}>
  {field.field}
  <MenuList>
  {getFieldTagsForField(field.field).map((fieldTag) => (
  <MenuItem
  key={fieldTag.fieldtagID}
  onClick={() => handleAddFieldClick(field.field, fieldTag.tag)}
  >
  {fieldTag.tag}
  </MenuItem>
  ))}
  </MenuList>
  </MenuItem>
  ))}
  </MenuList>
  </Paper>
  )}
  </div>
  );
  };
  
  export default Fields;