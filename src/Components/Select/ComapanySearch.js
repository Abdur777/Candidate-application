import React, { useState, useMemo, useCallback } from 'react';
import { TextField, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredListings } from '../../store/reducers/jobListingsReducer';

export default function CompanyNameSearch() {
  const { jobListings, filteredListings } = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(true);

  const handleInputChange = useCallback((event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    setIsInputLabelVisible(inputValue.length === 0); // Show InputLabel only if input is empty
    const filteredResults = filterResults(inputValue, filteredListings.length > 0 ? filteredListings : jobListings);
    dispatch(setFilteredListings(filteredResults));
  }, [dispatch, filteredListings, jobListings]);

  const filterResults = useCallback((inputValue, listings) => {
    if (!inputValue) return listings; // Return original listings if no input value
    const filterFunction = (job) => job.companyName.toLowerCase().includes(inputValue);
    return listings.filter(filterFunction);
  }, []);

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
