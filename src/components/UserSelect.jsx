//20.10.2022 tanımlandı düzenlenecek. 
import { useEffect, useState } from "react";
import React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [ 
   "ALİRIZA ALP",
   "TALHA ARSLAN",
   "HÜSEYİN ALP",
   "",
  
];


export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState([]);

 
  useEffect(() => {
    axios.get(`http://localhost:3002/data`).then((response) => {
    setPersonName(response.data);
    });
    }, []);
  
    useEffect(() => console.log(personName), [personName]);

    
    
  const handleChange = (event) => {
    axios
   .post("http://localhost:3002/data", {
    name: names,
    Date: new Date().getDate() + "/" + (new Date().getMonth()) + "/" + (new Date().getFullYear()),
    time:
new Date().getHours() +
":" +
new Date().getMinutes() +
":" +
new Date().getSeconds(),
}).then((response) => {
    setPersonName([...personName, response.data]);
}).catch(error => console.log(error))
    setPersonName()
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  

  return (
    <div >
      <FormControl className="hi" sx={{ m: 1, width: 300 }}>
        <InputLabel sx={{color:"black"}} id="demo-multiple-checkbox-label">USER SELECT</InputLabel>
        <Select
          sx={{color:"black"}}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
