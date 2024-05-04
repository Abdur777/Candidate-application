import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';
import { setFilteredListings } from '../../store/reducers/jobListingsReducer';

const experienceYears = Array.from({ length: 10 }, (_, index) => index + 1).map((year) => ({ year }));

export default function ExperienceSelect() {
  const {jobListings} = useSelector((state) => state.jobListings); // Access jobListings from the Redux store
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(true);
  const dispatch = useDispatch();
  const handleInputChange = (event, value, reason) => {
    if (reason === 'input') {
      setIsInputLabelVisible(false); // Hide InputLabel when user starts typing
    } else {
      setIsInputLabelVisible(!value); // Hide InputLabel when value is selected
    }
  };
  // console.log(jobListings,"fromkjfs")
  const handleExperienceChange = (event, value) => {
    // console.log(jobListings)
    if (value && jobListings) {
      const minExperience = value.year;
      // console.log(minExperience);
      const filteredListings = jobListings.filter(job => job.minExp >= minExperience); // Filter job listings based on minimum experience
      dispatch(setFilteredListings(filteredListings));
      // console.log(filteredListings);
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
          onChange={handleExperienceChange}
          onInputChange={handleInputChange}
          sx={{ width: 200 }}
        />
      </FormControl>
    </div>
  );
}
