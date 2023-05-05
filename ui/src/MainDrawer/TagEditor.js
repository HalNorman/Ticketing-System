import React, { useState, useEffect } from 'react';
import API from '../API_Interface/API_Interface';
import { Box, Collapse, Button, TextField, Typography, Divider } from '@mui/material';
import Stack from '@mui/joy/Stack';
import Snack from "../HomePage/SnackBar";

export default function FieldForm() {
  const [fields, setFields] = useState([]);
  const [initialFields, setInitialFields] = useState([]);
  const [openField, setOpenField] = useState(null);
  const [fieldInput, setFieldInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const [openSnack,setOpenSnack] = useState(false);
  const [snackMessage,setSnackMessage] = useState("")


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
    setSnackMessage("FieldTag Deleted");
    setOpenSnack(true);
  }

  function handleDeleteField(fieldName) {
    const updatedFields = fields.filter((field) => field.field !== fieldName);
    setFields(updatedFields);
    setSnackMessage("Field Deleted");
    setOpenSnack(true);
  }

  function handleAddFieldAndTag2() {
    
    const fieldExists = fields.find((field) => field.field === fieldInput);
    const fieldTagExists = (fields.find((fieldtag) => fieldtag.field === fieldInput && fieldtag.tag === tagInput));
    if(!fieldTagExists){
      const newFieldTag = {
        fieldtagID: Math.max(...fields.map((field) => field.fieldtagID)) + 1,
        field: fieldInput,
        tag: tagInput,
        valid: 1,
      };
  
      if (fieldExists && tagInput) {
        setFields([...fields, newFieldTag]);
        setSnackMessage("Tag Added To Field" );
        setOpenSnack(true);
      } else if (!fieldExists && fieldInput && tagInput) {
        setFields([...fields, newFieldTag]);
        setSnackMessage("Tag And Field Added" );
        setOpenSnack(true);
      }
    }else{
      setSnackMessage("Tag Already Exists");
      setOpenSnack(true);
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
    setSnackMessage("Changes Saved" );
    setOpenSnack(true);

    // Update initialFields state
    setInitialFields(fields);
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
        <TextField id="Field" label="Field" variant="outlined" onChange={(event) => setFieldInput(event.target.value)}/>
        <TextField id="Tag" label="Tag" variant="outlined" onChange={(event) => setTagInput(event.target.value)}/>
        <Button onClick={() => handleAddFieldAndTag2()} variant="contained">Add</Button>
      </Stack>
        <Box>
        <Button variant="contained" onClick={handleSave} color="secondary">Save</Button>
        </Box>
          {uniqueFields.map((field) => (
            <Stack direction="column" spacing={2} justifyContent="center" key={field}>
              <Box>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Button onClick={() => handleToggleFieldTags(field)} variant="outlined" color="secondary">
                    {field}
                  </Button>
                  <Button onClick={() => handleDeleteField(field)} variant="contained" color="secondary">Delete Field</Button>
                </Stack>
              </Box>
                <Collapse in={openField === field}>
                  <Stack direction="column" spacing={2} justifyContent="center" >
                    {fields.filter((fieldTag) => fieldTag.field === field).map((fieldTag) => (
                      <Box>
                        <Stack direction="row" spacing={2} justifyContent="center" key={fieldTag.fieldtagID}>
                          <Typography spacing={2}> {fieldTag.tag} </Typography>
                          <Button onClick={() =>handleDeleteFieldTag(fieldTag.fieldtagID)} variant="contained" color="secondary">Delete Tag</Button>
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