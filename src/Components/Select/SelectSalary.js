import * as React from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';

const salaryOptions = Array.from({ length: 71 }, (_, index) => ({ salary: index }));

export default function SalarySelect() {
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
        {isInputLabelVisible && <InputLabel htmlFor="salary-select">Minimum Base Pay Salary</InputLabel>}
        <Autocomplete
          id="salary-select"
          options={salaryOptions}
          getOptionLabel={(option) => `${option.salary}L`}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleInputChange}
          onInputChange={handleInputChange}
          sx={{ width: 235 }}
        />
      </FormControl>
    </div>
  );
}
