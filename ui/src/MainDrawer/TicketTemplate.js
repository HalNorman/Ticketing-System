import React, { useState } from 'react';
import fieldTags from './data.json';

function StringInputForm() {
  const [inputFields, setInputFields] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [dropDownOptions, setDropDownOptions] = useState(fieldTags.fieldtags);

  const handleAddField = () => {
    setInputFields([...inputFields, { leftFieldId: '', leftFieldOther: '', rightFieldId: '' }]);
  };

  const handleRemoveField = (indexToRemove) => {
    setInputFields(inputFields.filter((_, index) => index !== indexToRemove));
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...inputFields];
    newFields[index][key] = value;
    if (key === 'leftFieldId') {
      const fieldTag = fieldTags.fieldtags.find((fieldTag) => fieldTag.field === value);
      const rightOptions =fieldTag ? fieldTag.tags : [];
      if (newTag !== '') {
        rightOptions.push({ tag: newTag });
      }
      newFields[index]['rightFieldId'] = '';
      setInputFields(newFields);
      setInputFields((prev) =>
        prev.map((input, i) => {
          if (i === index) {
            return { ...input, rightFieldId: '', rightDropdownOptions: rightOptions };
          }
          return input;
        })
      );
    } else {
      setInputFields(newFields);
    }
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
    setDropDownOptions([...dropDownOptions, { field: newTag, tags: [] }]);
  };

  const leftDropdownOptions = [
    { label: 'Select Field', value: '' },
    ...dropDownOptions.map((fieldTag) => ({ label: fieldTag.field, value: fieldTag.field })),
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {inputFields.map((field, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <select
            value={field.leftFieldId}
            onChange={(e) => handleFieldChange(index, 'leftFieldId', e.target.value)}
            style={{ width: '40%', height: '50px', marginRight: '10px' }}
          >
            {leftDropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {field.leftFieldId === 'Other' && (
            <input
              type="text"
              value={field.leftFieldOther}
              onChange={(e) => handleFieldChange(index, 'leftFieldOther', e.target.value)}
              placeholder="Enter Value"
              style={{ width: '20%', height: '50px', marginRight:'10px' }}
            />
          )}
          <select
            value={field.rightFieldId}
            onChange={(e) => handleFieldChange(index, 'rightFieldId', e.target.value)}
            style={{ width: '40%', height: '50px', marginRight: '10px' }}
          >
            <option value="">Select Field</option>
            <option value="New Tag">New Tag</option>
            {field.rightDropdownOptions &&
              field.rightDropdownOptions.map((option) => (
                <option key={option.tag} value={option.tag}>
                  {option.tag}
                </option>
              ))}
          </select>
          {field.rightFieldId === 'New Tag' && (
            <input
              type="text"
              value={newTag}
              onChange={handleNewTagChange}
              placeholder="Enter Value"
              style={{ width: '20%', height: '50px', marginRight: '10px' }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  //close dropdown
                  document.getElementsByClassName('dropdown')[0].style.display = 'none';
                  //clear field
                  setNewTag('');
                }
              }}
            />
          )}
          <button onClick={() => handleRemoveField(index)}>-</button>
        </div>
      ))}
      <button onClick={handleAddField} style={{ padding: '10px 20px', marginTop: '10px' }}>Add Field</button>
    </div>
  );
}

export default StringInputForm;