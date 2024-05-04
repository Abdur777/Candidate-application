import * as React from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';

const remoteOptions = [
  { option: 'Remote' },
  { option: 'Hybrid' },
  { option: 'In-office' },
];

export default function RemoteSelect() {
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
        {isInputLabelVisible && <InputLabel htmlFor="remote-select">Remote</InputLabel>}
        <Autocomplete
          id="remote-select"
          options={remoteOptions}
          getOptionLabel={(option) => option.option}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleInputChange}
          onInputChange={handleInputChange}
          sx={{ width: 200 }}
        />
      </FormControl>
    </div>
  );
}
