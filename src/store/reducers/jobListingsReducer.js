import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobListings: [],
  loading: false,
  error: null,
  filteredListings: [],
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
  },
});

export const { fetchJobListingsRequest, fetchJobListingsSuccess, fetchJobListingsFailure, setFilteredListings} = jobListingsSlice.actions;

export default jobListingsSlice.reducer;
