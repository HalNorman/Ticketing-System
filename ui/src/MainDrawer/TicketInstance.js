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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/icons-material/Lock";

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
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            my: 1,
            p: 1,
            border: "2px solid",
            borderColor: "secondary.main",
          }}
        >
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
              <Select
                value={selectedTags[index] ? selectedTags[index].tag : null}
                onChange={(event) => handleTagChange(event, index)}
              >
                {getMenuItems(field.field)}
              </Select>
              <IconButton
                edge="end"
                color="error"
                onClick={() => handleDeleteField(index)}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Fragment>
          )}
        </Box>
      ))}
  <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
      <Select
        onChange={(event) => handleAddField(event.target.value)}
        defaultValue=""
      >
        <MenuItem value="" disabled>
          Add Field
        </MenuItem>
        {getAvailableFieldsToAdd().map((field) => (
          <MenuItem key={field} value={field}>
            {field}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={handleFormSubmit} variant="contained" sx={{ ml: 1 }}>
        Submit
      </Button>
    </Box>
  </Box>
);
};

export default Fields;