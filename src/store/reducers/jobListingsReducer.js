import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobListings: [],
  loading: false,
  error: null,
  filteredListings: [],
  totalListings: [],
  role: "",
  minSalary: "",
  exp: "",
  location: "",
};

const jobListingsSlice = createSlice({
  name: 'jobListings',
  initialState,
  reducers: {
    fetchJobListingsRequest(state) {
      state.loading = true;
    },
    fetchJobListingsSuccess(state, action) {
      state.loading = false;
      state.jobListings = action.payload;
      state.error = null;
    },
    fetchJobListingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setFilteredListings(state, action) {
      state.filteredListings = action.payload;
    },
    setTotalListing (state, action){
      state.totalListings = action.payload
    },
    setRole (state,action){
      state.role = action.payload
    },
    setMinSalary (state,action){
      state.minSalary = action.payload
    },
    setExp (state,action){
      state.exp = action.payload
    },
    setLocation (state,action){
      state.location = action.payload
    }
  },
});

export const { fetchJobListingsRequest, fetchJobListingsSuccess, fetchJobListingsFailure, setFilteredListings, setTotalListing ,setRole, setMinSalary, setExp, setLocation} = jobListingsSlice.actions;

export default jobListingsSlice.reducer;
