import {useState} from 'react';
import { Autocomplete, TextField,FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredListings } from '../../store/reducers/jobListingsReducer';

const roles = [
  { role: 'Frontend', category: 'Engineering' },
  { role: 'Backend ', category: 'Engineering' },
  { role: 'Fullstack', category: 'Engineering' },
  { role: 'IOS', category: 'Engineering' },
  { role: 'Flutter', category: 'Engineering' },
  { role: 'React Native', category: 'Engineering' },
  { role: 'Tech Lead', category: 'Engineering' },
  { role: 'Data Engineer', category: 'Engineering' },
  { role: 'Data Science', category: 'Engineering' },
  { role: 'Computer Vision', category: 'Engineering' },
  { role: 'NLP', category: 'Engineering' },
  { role: 'Deep Learning', category: 'Engineering' },
  { role: 'Test / Qa', category: 'Engineering' },
  { role: 'Web3', category: 'Engineering' },
  { role: 'Data-infrastructure', category: 'Engineering' },
  { role: 'Dev-Ops', category: 'Engineering' },
  { role: 'sre', category: 'Engineering' },
  { role: 'Design', category: 'Designer' },
];

export default function RoleSelect() {
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

  const handleRoleChange = (event, value) => {
    // console.log(jobListings)
    if (value && jobListings) {
      const role = value.role.toLowerCase();
      console.log(role)
      // console.log(minSalary);
      const filteredListings = jobListings.filter(job => job.jobRole.toLowerCase().includes(role)); // Filter job listings based on minimum experience
      dispatch(setFilteredListings(filteredListings));
      // console.log(filteredListings);
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ m: 2 }}>
        {isInputLabelVisible && <InputLabel htmlFor="role-select">Roles</InputLabel>}
        <Autocomplete
          id="role-select"
          options={roles}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.role}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleRoleChange}
          onInputChange={handleInputChange}
          renderOption={(props, option) => (
            <div {...props}>
              {option.role}
            </div>
          )}
          sx={{width:200}}
        />
      </FormControl>
    </div>
  );
}
