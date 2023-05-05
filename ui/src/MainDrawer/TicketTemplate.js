import React, { useState, useEffect } from 'react';
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
  Grid
} from '@mui/material';

function TicketTemplate() {
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const api = new API();

    async function getFieldTags() {
      const routesJSONString = await api.getAllFieldTags();
      setFields(routesJSONString.data);
    }

    getFieldTags();
  }, []);

  function handleAddField(field) {
    // Check if the field already exists in the selectedFields array
    const fieldExists = selectedFields.some(
      (selectedField) => selectedField.field === field
    );
  
    // If the field does not exist, add it to the selectedFields array
    if (!fieldExists) {
      setSelectedFields([...selectedFields, { field, fieldTag: null }]);
    }
  }

  function handleDeleteField(index) {
    const updatedSelectedFields = [...selectedFields];
    updatedSelectedFields.splice(index, 1);
    setSelectedFields(updatedSelectedFields);
  }

  function handleSelectFieldTag(index, fieldTag) {
    const updatedSelectedFields = [...selectedFields];
    updatedSelectedFields[index].fieldTag = fieldTag;
    setSelectedFields(updatedSelectedFields);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const api = new API();
    const template = { title, info };
    const template_field_array = selectedFields.map((field) => field.fieldTag.fieldtagID);
    console.log("template_field_array ", template_field_array);
    await api.createTicketTemplate(template, template_field_array);

    //create the ticket template fields
  }


  return (
    <div>
      <h1>TicketTemplate</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <br />
        <TextField
          label="Info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          sx={{ mb: 4 }}
        />
        <Grid container spacing={2}>
          {selectedFields.map((selectedField, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                {selectedField.field}
              </Grid>
              <Grid item xs={6}>
                <FieldTagSelector
                  field={selectedField.field}
                  fields={fields}
                  onSelectFieldTag={(fieldTag) =>
                    handleSelectFieldTag(index, fieldTag)
                  }
                />
                <button type="button" onClick={() => handleDeleteField(index)}>
                  -
                </button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <AddFieldButton fields={fields} onAddField={handleAddField} />
        <Button type="submit" variant="contained" color='secondary' sx={{ backgroundColor:'secondary.main' }}>Submit</Button>
      </form>
    </div>
  );
}


function AddFieldButton({ fields, onAddField }) {
  const [selectedField, setSelectedField] = useState('');

  const handleChange = (event) => {
    setSelectedField(event.target.value);
    onAddField(event.target.value);
  };

  const uniqueFields = [...new Set(fields.map((field) => field.field))];

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="add-field-label">Add Field</InputLabel>
        <Select
          labelId="add-field-label"
          id="add-field"
          value={selectedField}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {uniqueFields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function FieldTagSelector({ field, fields, onSelectFieldTag }) {
  const [selectedFieldTag, setSelectedFieldTag] = useState(null);

  const handleChange = (event) => {
    setSelectedFieldTag(event.target.value);
    onSelectFieldTag(event.target.value);
  };

  const fieldTags = fields.filter((f) => f.field === field);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={`select-field-tag-label-${field}`}>Select Field Tag</InputLabel>
        <Select
          labelId={`select-field-tag-label-${field}`}
          id={`select-field-tag-${field}`}
          value={selectedFieldTag}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {fieldTags.map((fieldTag) => (
            <MenuItem key={fieldTag.fieldtagID} value={fieldTag}>
              {fieldTag.tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TicketTemplate;