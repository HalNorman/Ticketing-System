import React, { useState, useEffect } from 'react';
import API from '../API_Interface/API_Interface';
import { Box } from '@mui/material';

export default function FieldForm() {
  const [fields, setFields] = useState([]);
  const [fieldTags, setFieldTags] = useState([]);

  useEffect(() => {
    const api = new API();
    
    async function getFieldTags() {
      const routesJSONString = await api.getAllFieldTags();
      setFieldTags(routesJSONString.data);
    }
    
    getFieldTags();
  }, []);

  async function handleAddField(event) {
    event.preventDefault();
    const newField = event.target.elements.field.value;
    if (newField && !fields.includes(newField)) {
      setFields([...fields, newField]);
    }
  }

  function handleDeleteField(fieldToDelete) {
    const updatedFields = fields.filter(field => field !== fieldToDelete);
    setFields(updatedFields);
  }

  return (
    <Box sx={{my:8}}>
      <form onSubmit={handleAddField}>
        <label htmlFor="field">Add Field:</label>
        <input type="text" id="field" name="field" />
        <select name="fieldTag">
          {fieldTags.map((fieldTag) => (
            fieldTag.valid && (
              <option key={fieldTag.fieldtagID} value={fieldTag.tag}>
                {fieldTag.field} - {fieldTag.tag}
              </option>
            )
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      <ul>
        {fields.map((field) => (
          <li key={field}>
            {field}
            <button onClick={() => handleDeleteField(field)}>Delete</button>
          </li>
        ))}
      </ul>
    </Box>
  );
}