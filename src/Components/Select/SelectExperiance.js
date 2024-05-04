import * as React from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';

const experienceYears = Array.from({ length: 10 }, (_, index) => index + 1).map((year) => ({ year }));

export default function ExperienceSelect() {
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
        {isInputLabelVisible && <InputLabel htmlFor="experience-select">Experience (years)</InputLabel>}
        <Autocomplete
          id="experience-select"
          options={experienceYears}
          getOptionLabel={(option) => option.year.toString()}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleInputChange}
          onInputChange={handleInputChange}
          sx={{ width: 200 }}
        />
      </FormControl>
    </div>
  );
}
