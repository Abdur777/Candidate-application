import * as React from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';

const employeeRanges = [
  { range: '1-10' },
  { range: '11-20' },
  { range: '21-30' },
  { range: '31-40' },
  { range: '41-50' },
  { range: '51-100' },
  { range: '101-200' },
  { range: '201-300' },
  { range: '301-400' },
  { range: '401-500' },
  { range: '500+' },
];

export default function NumberOfEmployeesSelect() {
  const [isInputLabelVisible, setIsInputLabelVisible] = React.useState(true);

  const handleInputChange = (event, value, reason) => {
    if (reason === 'input') {
      setIsInputLabelVisible(false); // Hide InputLabel when user starts typing
    } else {
      setIsInputLabelVisible(!value); // Hide InputLabel when value is selected
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ m: 2 }}>
        {isInputLabelVisible && <InputLabel htmlFor="employee-select">Number of Employees</InputLabel>}
        <Autocomplete
          id="employee-select"
          options={employeeRanges}
          getOptionLabel={(option) => option.range}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleInputChange}
          onInputChange={handleInputChange}
          sx={{ width: 205 }}
        />
      </FormControl>
    </div>
  );
}
