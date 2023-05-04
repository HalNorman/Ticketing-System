import React, { useState, useEffect } from 'react';
import API from '../API_Interface/API_Interface';
import { Box, Collapse } from '@mui/material';

export default function FieldForm() {
  const [fields, setFields] = useState([]);
  const [initialFields, setInitialFields] = useState([]);
  const [openField, setOpenField] = useState(null);

  useEffect(() => {
    const api = new API();

    async function getFieldTags() {
      const routesJSONString = await api.getAllFieldTags();
      setFields(routesJSONString.data);
      setInitialFields(routesJSONString.data);
    }

    getFieldTags();
  }, []);

  function handleDeleteFieldTag(fieldID) {
    const updatedFields = fields.filter(
      (field) => field.fieldtagID !== fieldID
    );
    setFields(updatedFields);
  }

  function handleDeleteField(fieldName) {
    const updatedFields = fields.filter((field) => field.field !== fieldName);
    setFields(updatedFields);
  }

  function handleAddFieldAndTag(event) {
    event.preventDefault();
    const newField = event.target.elements.field.value;
    const newTag = event.target.elements.tag.value;
    const fieldExists = fields.find((field) => field.field === newField);

    const newFieldTag = {
      fieldtagID: Math.max(...fields.map((field) => field.fieldtagID)) + 1,
      field: newField,
      tag: newTag,
      valid: 1,
    };

    if (fieldExists && newTag) {
      setFields([...fields, newFieldTag]);
    } else if (!fieldExists && newField && newTag) {
      setFields([...fields, newFieldTag]);
    }
  }

  function handleToggleFieldTags(field) {
    setOpenField((prevOpenField) => (prevOpenField === field ? null : field));
  }

  async function handleSave() {
    const api = new API();

    // Find and delete removed field tags
    for (const initialField of initialFields) {
      if (!fields.find((field) => field.fieldtagID === initialField.fieldtagID)) {
        await api.deleteFieldTag(initialField.fieldtagID);
      }
    }

    // Find and add new field tags
    for (const field of fields) {
      if (!initialFields.find((initialField) => initialField.fieldtagID === field.fieldtagID)) {
        const fieldTag = { field: field.field, tag: field.tag };
        await api.addFieldTag(fieldTag);
      }
    }

    // Update initialFields state
    setInitialFields(fields);
  }

  const uniqueFields = Array.from(
    new Set(fields.map((fieldTag) => fieldTag.field))
  );

  return (
    <Box sx={{ my: 8}}  >
      <form onSubmit={handleAddFieldAndTag}>
        <label htmlFor="field">Field:</label>
        <input type="text" id="field" name="field" />
        <label htmlFor="tag">Tag:</label>
        <input type="text" id="tag" name="tag" />
        <button type="submit">Add</button>
      </form>
      <button onClick={handleSave}>Save</button>
      <ul>
        {uniqueFields.map((field) => (
          <li key={field}>
            <button onClick={() => handleToggleFieldTags(field)}>
              {field}
            </button>
            <button onClick={() => handleDeleteField(field)}>
              Delete Field
            </button>
            <Collapse in={openField === field}>
              <ul>
                {fields
                  .filter((fieldTag) => fieldTag.field === field)
                  .map((fieldTag) => (
                    <li key={fieldTag.fieldtagID}>
                      {fieldTag.tag}
                      <button
                        onClick={() =>
                          handleDeleteFieldTag(fieldTag.fieldtagID)
                        }
                      >
                        Delete Tag
                      </button>
                    </li>
                  ))}
              </ul>
            </Collapse>
          </li>
        ))}
      </ul>
    </Box>
  );
}


















// import React, { useState, useEffect } from 'react';
// import API from '../API_Interface/API_Interface';
// import { Box, Collapse } from '@mui/material';

// export default function FieldForm() {
//   const [fields, setFields] = useState([]);
//   const [openField, setOpenField] = useState(null);

//   useEffect(() => {
//     const api = new API();

//     async function getFieldTags() {
//       const routesJSONString = await api.getAllFieldTags();
//       setFields(routesJSONString.data);
//     }

//     getFieldTags();
//   }, []);

//   function handleDeleteFieldTag(fieldID) {
//     const updatedFields = fields.filter(
//       (field) => field.fieldtagID !== fieldID
//     );
//     setFields(updatedFields);
//   }

//   function handleDeleteField(fieldName) {
//     const updatedFields = fields.filter((field) => field.field !== fieldName);
//     setFields(updatedFields);
//   }

//   function handleAddFieldAndTag(event) {
//     event.preventDefault();
//     const newField = event.target.elements.field.value;
//     const newTag = event.target.elements.tag.value;
//     const fieldExists = fields.find((field) => field.field === newField);

//     const newFieldTag = {
//       fieldtagID: Math.max(...fields.map((field) => field.fieldtagID)) + 1,
//       field: newField,
//       tag: newTag,
//       valid: 1,
//     };

//     if (fieldExists && newTag) {
//       setFields([...fields, newFieldTag]);
//     } else if (!fieldExists && newField && newTag) {
//       setFields([...fields, newFieldTag]);
//     }
//   }

//   function handleToggleFieldTags(field) {
//     setOpenField((prevOpenField) => (prevOpenField === field ? null : field));
//   }

//   const uniqueFields = Array.from(
//     new Set(fields.map((fieldTag) => fieldTag.field))
//   );

//   return (
//     <Box sx={{ my: 8 }}>
//       <form onSubmit={handleAddFieldAndTag}>
//         <label htmlFor="field">Field:</label>
//         <input type="text" id="field" name="field" />
//         <label htmlFor="tag">Tag:</label>
//         <input type="text" id="tag" name="tag" />
//         <button type="submit">Add</button>
//       </form>
//       <ul>
//         {uniqueFields.map((field) => (
//           <li key={field}>
//             <button onClick={() => handleToggleFieldTags(field)}>
//               {field}
//             </button>
//             <button onClick={() => handleDeleteField(field)}>
//               Delete Field
//             </button>
//             <Collapse in={openField === field}>
//               <ul>
//                 {fields
//                   .filter((fieldTag) => fieldTag.field === field)
//                   .map((fieldTag) => (
//                     <li key={fieldTag.fieldtagID}>
//                       {fieldTag.tag}
//                       <button
//                         onClick={() =>
//                           handleDeleteFieldTag(fieldTag.fieldtagID)
//                         }
//                       >
//                         Delete Tag
//                       </button>
//                     </li>
//                   ))}
//               </ul>
//             </Collapse>
//           </li>
//         ))}
//       </ul>
//     </Box>
//   );
// }