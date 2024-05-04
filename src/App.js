import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllSelect from "./Components/Select/AllSelect";
import JobCard from './Components/JobCard/JobCard';
import { fetchJobListings } from './store/actions/jobListingsActions';
import { Box } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const { jobListings, loading, error } = useSelector((state) => state.jobListings);

  useEffect(() => {
    dispatch(fetchJobListings());
  }, [dispatch]);

  return (
    <div>
      <AllSelect />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {jobListings.jdList && jobListings.jdList.map((job, index) => (
          <Box key={index} sx={{ flex: '0 0 25%', maxWidth: '25%' }}>
            <JobCard job={job} />
          </Box>
        ))}
      </Box>
    </div>
  );
}
