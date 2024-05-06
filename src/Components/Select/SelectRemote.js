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
  const {jobListings, error , loading , filteredListings, totalListings, role, minSalary, exp, location} = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [isInputLabelVisible, setIsInputLabelVisible] = React.useState(true);

  // Debounce the input change handler
  const debouncedHandleInputChange = React.useCallback(
    debounce((inputValue) => {
     let filteredResults = [];
     console.log(inputValue)
      // if (exp!=='' && filteredListings) {
      //   // Filter jobListings based on the company name
      //   filteredResults = filteredListings.filter(job => job.location.toLowerCase().includes(inputValue));
      //   dispatch(setLocation(inputValue));
      // }
      if(totalListings){
        console.log(totalListings);
        dispatch(setLocation(inputValue));
        let filteredResults = totalListings.filter(job => job.location.toLowerCase().includes(inputValue));
        if(exp!='') filteredResults = filteredResults.filter(job => job.minExp>=exp);
        if(minSalary!=='') filteredResults.filter(job => job.minJdSalary >= minSalary);
        if(role!=='') filteredResults = filteredResults.filter(job => job.jobRole.toLowerCase().includes(role));
      }
  
      // Dispatch the filtered results to update the state
      dispatch(setFilteredListings(filteredResults));
    }, 300), // Set debounce delay to 300 milliseconds
    [dispatch, jobListings]
  );

  // Handle input change
  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    setIsInputLabelVisible(inputValue.length === 0); 
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
