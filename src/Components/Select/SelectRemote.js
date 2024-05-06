import * as React from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredListings, setLocation } from '../../store/reducers/jobListingsReducer';
import { debounce } from 'lodash'; // Import debounce function from lodash

const remoteOptions = [
  { option: 'Remote' },
  { option: 'Hybrid' },
  { option: 'In-office' },
];

export default function RemoteSelect() {
  const { jobListings,totalListings,role,exp, minSalary} = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [isInputLabelVisible, setIsInputLabelVisible] = React.useState(true);

  // Debounce the input change handler
  const debouncedHandleInputChange = React.useCallback(
    debounce((inputValue) => {
      setIsInputLabelVisible(inputValue.length === 0); // Show InputLabel only if input is empty
      
      let filteredResults = [];
      if (totalListings) {
        // Filter jobListings based on the company name
        filteredResults = totalListings.filter(job => job.location.toLowerCase().includes(inputValue));
        if(role!=='') filteredResults = filteredResults.filter(job => job.jobRole.toLowerCase().includes(role));
        if(exp!=='') filteredResults = filteredResults.filter(job => job.minExp >= exp);
        if(minSalary!=='') filteredResults = filteredResults.filter(job => job.minJdSalary >= minSalary);
        dispatch(setLocation(inputValue));
      }
  
      // Dispatch the filtered results to update the state
      dispatch(setFilteredListings(filteredResults));
    }, 300), // Set debounce delay to 300 milliseconds
    [dispatch, jobListings]
  );

  // Handle input change
  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    debouncedHandleInputChange(inputValue); // Call debounced handler with input value
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
