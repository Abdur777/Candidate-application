import * as React from 'react';
import { TextField, FormControl, InputLabel } from '@mui/material';

export default function CompanyNameSearch() {
  const [isInputLabelVisible, setIsInputLabelVisible] = React.useState(true);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setIsInputLabelVisible(inputValue.trim().length === 0); // Show InputLabel only if input is empty
  };

  return (
    <div>
      <FormControl fullWidth sx={{ m: 2 }}>
        {isInputLabelVisible && <InputLabel htmlFor="company-name-search">Search Company Name</InputLabel>}
        <TextField
          id="company-name-search"
          onChange={handleInputChange}
          sx={{ width: 200 }}
        />
      </FormControl>
    </div>
  );
}
