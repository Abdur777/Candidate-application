import * as React from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredListings } from '../../store/reducers/jobListingsReducer';

const remoteOptions = [
  { option: 'Remote' },
  { option: 'Hybrid' },
  { option: 'In-office' },
];

export default function RemoteSelect() {
  const { jobListings, filteredListings } = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [isInputLabelVisible, setIsInputLabelVisible] = React.useState(true);

    const handleInputChange = (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    setIsInputLabelVisible(inputValue.length === 0); // Show InputLabel only if input is empty

    let filteredResults = [];
    if (filteredListings && filteredListings.length > 0) {
      // If filteredListings is not empty, filter it based on the company name
      filteredResults = filteredListings.filter(job => job.location.toLowerCase().includes(inputValue));
    } else if (jobListings && jobListings.length > 0) {
      // If filteredListings is empty, filter jobListings based on the company name
      filteredResults = jobListings.filter(job => job.location.toLowerCase().includes(inputValue));
    }

    // Dispatch the filtered results to update the state
    dispatch(setFilteredListings(filteredResults));
  };

  return (
    <div>
      <FormControl fullWidth sx={{ m: 2 }}>
        {isInputLabelVisible && <InputLabel htmlFor="remote-select">Location</InputLabel>}
        <TextField
          id="remote-select"
          onChange={handleInputChange}
          sx={{ width: 200 }}
        />
      </FormControl>
    </div>
  );
}
