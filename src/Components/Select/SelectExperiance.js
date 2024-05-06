import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';
import { setFilteredListings } from '../../store/reducers/jobListingsReducer';
import { setExp } from '../../store/reducers/jobListingsReducer';

const experienceYears = Array.from({ length: 10 }, (_, index) => index + 1).map((year) => ({ year }));

export default function ExperienceSelect() {
  const {jobListings, error , loading , filteredListings, totalListings, role, minSalary, exp, location} = useSelector((state) => state.jobListings); // Access jobListings from the Redux store
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(true);
  const dispatch = useDispatch();
  const handleInputChange = (event, value, reason) => {
    if (reason === 'input') {
      setIsInputLabelVisible(false); // Hide InputLabel when user starts typing
    } else {
      setIsInputLabelVisible(!value); // Hide InputLabel when value is selected
    }
  };
  
  const handleExperienceChange = (event, value) => {
    
    // if (value && location && filteredListings) {
    //   const minExperience = value.year;
    //   var filteredResults = filteredListings.filter(job => job.minExp > minExperience); // Filter job listings based on minimum experience
    //   // console.log(location,filteredResults,"jsbfjbsjbfs")
    //   console.log(minExperience,exp,"sjgjsdjndjn")
    //   if(exp!=='' && minExperience!==exp){
    //     filteredResults = totalListings.filter(job => job.location.toLowerCase().includes(location));
    //     const final = filteredResults.filter(job => job.minExp >= minExperience);
    //     dispatch(setFilteredListings(final));
    //     console.log(filteredResults);
    //   }
    //   else dispatch(setFilteredListings(filteredResults));
    //   dispatch(setExp(minExperience));
      
    // }
    console.log(value.year,exp,"kshfsdkfk")
    if(value && totalListings){
      const minExperience = value.year;
      dispatch(setExp(minExperience));
      let filteredResults = totalListings.filter(job => job.minExp >= minExperience); // Filter job listings based on minimum experience
      if(location!=='') filteredResults=filteredResults.filter(job => job.location.toLowerCase().includes(location));
      if(minSalary!=='') filteredResults.filter(job => job.minJdSalary >= minSalary);
      if(role!=='') filteredResults = filteredResults.filter(job => job.jobRole.toLowerCase().includes(role));
      dispatch(setFilteredListings(filteredResults));
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
