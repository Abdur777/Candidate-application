import{useState} from 'react';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredListings } from '../../store/reducers/jobListingsReducer';
const salaryOptions = Array.from({ length: 71 }, (_, index) => ({ salary: index }));

export default function SalarySelect() {
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

  const handleSalaryChange = (event, value) => {
    // console.log(jobListings)
    if (value && jobListings) {
      const minSalary = value.salary;
      // console.log(minSalary);
      const filteredListings = jobListings.filter(job => job.minJdSalary >= minSalary); // Filter job listings based on minimum experience
      dispatch(setFilteredListings(filteredListings));
      // console.log(filteredListings);
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ m: 2 }}>
        {isInputLabelVisible && <InputLabel htmlFor="salary-select">Minimum Base Pay Salary</InputLabel>}
        <Autocomplete
          id="salary-select"
          options={salaryOptions}
          getOptionLabel={(option) => option.salary}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleSalaryChange}
          onInputChange={handleInputChange}
          sx={{ width: 235 }}
        />
      </FormControl>
    </div>
  );
}
