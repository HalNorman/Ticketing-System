import React, { Fragment, useState, useEffect } from "react";
import API from '../API_Interface/API_Interface';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";



// const template =
// {
//     "TemplateTicket": [
//       {
//         "templateID": 1,
//         "title": "this is a template",
//         "info": "something useful",
//         "fieldtagID": 1,
//         "field": "Computer Type",
//         "tag": "PC",
//         "valid": 1
//       },
//       {
//         "templateID": 1,
//         "title": "this is a template",
//         "info": "something useful",
//         "fieldtagID": 4,
//         "field": "Building",
//         "tag": "Ives",
//         "valid": 1
//       },
//       {
//         "templateID": 1,
//         "title": "this is a template",
//         "info": "something useful",
//         "fieldtagID": 6,
//         "field": "Issue",
//         "tag": "Liquid Spill",
//         "valid": 1
//       }
//     ]
// };

// const fields = template.TemplateTicket.map((ticket) => ({
//   fieldtagID: ticket.fieldtagID,
//   field: ticket.field,
//   tag: ticket.tag,
// }));

// const fieldTags = {
//     fieldtags: [
//       {
//         fieldtagID: 1,
//         field: "Computer Type",
//         tags: [
//           {
//             tag: "PC",
//           },
//           {
//             tag: "Mac",
//           },
//           {
//             tag: "Linux",
//           },
//         ],
//       },
//       {
//         fieldtagID: 4,
//         field: "Building",
//         tags: [
//           {
//             tag: "Ives",
//           },
//           {
//             tag: "Tanna",
//           },
//           {
//             tag: "Arin",
//           },
//           {
//             tag: "Hale",
//           },
//           {
//             tag: "Een",
//           },
//         ],
//       },
//       {
//         fieldtagID: 6,
//         field: "Issue",
//         tags: [
//           {
//             tag: "Liquid Spill",
//           },
//           {
//             tag: "Solid Spill",
//           },
//           {
//             tag: "Gas Leak",
//           },
//         ],
//       },
//     ],
//   };

const Fields = (props) => {
  console.log(props.title);
  console.log(props.info);
  console.log(props.id);

  useEffect(() => {
    const api = new API();

    async function getTickets() {
        const routesJSONString = await  api.getTicketByID(props.id);
        console.log(`Tickets from the DB ${JSON.stringify(routesJSONString)}`);
        //setTicketInstanceIDs(routesJSONString.data);
    }

    getTickets();
}, []);

  const template =
  {
      "TemplateTicket": [
        {
          "templateID": 1,
          "title": "hard coded title",
          "info": "In Progress",
          "fieldtagID": 1,
          "field": "Computer Type",
          "tag": "PC",
          "valid": 1
        },
        {
          "templateID": 1,
          "title": "this is a template",
          "info": "something useful",
          "fieldtagID": 4,
          "field": "Building",
          "tag": "Ives",
          "valid": 1
        },
        {
          "templateID": 1,
          "title": "this is a template",
          "info": "something useful",
          "fieldtagID": 6,
          "field": "Issue",
          "tag": "Liquid Spill",
          "valid": 1
        }
      ]
  };

const template =
{
    "TemplateTicket": [
      {
        "templateID": 1,
        "title": "this is a template",
        "info": "In Progress",
        "fieldtagID": 1,
        "field": "Computer Type",
        "tag": "PC",
        "valid": 1
      },
      {
        "templateID": 1,
        "title": "this is a template",
        "info": "something useful",
        "fieldtagID": 4,
        "field": "Building",
        "tag": "Ives",
        "valid": 1
      },
      {
        "templateID": 1,
        "title": "this is a template",
        "info": "something useful",
        "fieldtagID": 6,
        "field": "Issue",
        "tag": "Liquid Spill",
        "valid": 1
      }
    ]
};


const fields = template.TemplateTicket.map((ticket) => ({
  fieldtagID: ticket.fieldtagID,
  field: ticket.field,
  tag: ticket.tag,
}));

const fieldTags = {
    fieldtags: [
      {
        fieldtagID: 1,
        field: "Computer Type",
        tags: [
          {
            tag: "PC",
          },
          {
            tag: "Mac",
          },
          {
            tag: "Linux",
          },
        ],
      },
      {
        fieldtagID: 4,
        field: "Building",
        tags: [
          {
            tag: "Ives",
          },
          {
            tag: "Tanna",
          },
          {
            tag: "Arin",
          },
          {
            tag: "Hale",
          },
          {
            tag: "Een",
          },
        ],
      },
      {
        fieldtagID: 6,
        field: "Issue",
        tags: [
          {
            tag: "Liquid Spill",
          },
          {
            tag: "Solid Spill",
          },
          {
            tag: "Gas Leak",
          },
        ],
      },
    ],
  };

const Fields = () => { //brought down const template, const fields, const fieldTags. This was originally outside of our Fields function



  const title = template.TemplateTicket[0].title;
  const info =  template.TemplateTicket[0].info;

  const [selectedTags, setSelectedTags] = useState(
    fields.reduce((obj, field) => {
      obj[field.fieldtagID] = field.tag;
      return obj;
    }, {})
  );

  const handleTagChange = (event, fieldtagID) => {
    const newSelectedTags = { ...selectedTags };
    newSelectedTags[fieldtagID] = event.target.value;
    setSelectedTags(newSelectedTags);
  };

  const getMenuItems = (fieldtagID) => {
    const matchingField = fieldTags.fieldtags.find(
      (field) => field.fieldtagID === fieldtagID
    );
    if (!matchingField) return null;

    return matchingField.tags.map((tag) => (
      <MenuItem key={tag.tag} value={tag.tag}>
        {tag.tag}
      </MenuItem>
    ));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const selectedFields = fields.map((field) => ({
      fieldtagID: field.fieldtagID,
      field: field.field,
      tag: selectedTags[field.fieldtagID],
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
      {fields.map((field) => (
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
            value={selectedTags[field.fieldtagID]}
            onChange={(event) => handleTagChange(event, field.fieldtagID)}
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