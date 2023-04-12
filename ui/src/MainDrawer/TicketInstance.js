import React, { useState } from "react";
import { Box, Typography, MenuItem, Select } from "@mui/material";


const template = 
{
    "TemplateTicket": [
      {
        "templateID": 1,
        "title": "this is a template",
        "info": "something useful",
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

const Fields = () => {
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

  return (
    <>
      {fields.map((field) => (
        <Box
          key={field.fieldtagID}
          sx={{
            display: "flex",
            alignItems: "center",
            my: 1,
            p: 1,
            border: "1px solid black",
          }}
        >
          <Typography sx={{ mr: 1 }}>{field.field}:</Typography>
          <Select
            value={selectedTags[field.fieldtagID]}
            onChange={(event) => handleTagChange(event, field.fieldtagID)}
          >
            {getMenuItems(field.fieldtagID)}
          </Select>
        </Box>
      ))}
    </>
  );
};

export default Fields;