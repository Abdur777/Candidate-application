import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllSelect from "./Components/Select/AllSelect";
import JobCard from './Components/JobCard/JobCard';
import { fetchJobListings } from './store/actions/jobListingsActions';
import { Box } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const { jobListings, loading, error, filteredListings } = useSelector((state) => state.jobListings);
  const [page, setPage] = useState(0); // State to track current page number
  const [allJobListings, setAllJobListings] = useState([]); // State to store all job listings

  useEffect(() => {
    dispatch(fetchJobListings(page)); // Fetch initial job listings
  }, [dispatch, page]);

  // Function to handle scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) return;
    setPage(prevPage => prevPage + 1); // Increment page number when reaching bottom of page
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Remove event listener when component unmounts
  }, []);

  // Update job listings when they are fetched
  useEffect(() => {
    if (jobListings.length > 0) {
      setAllJobListings(prevListings => [...prevListings, ...jobListings]); // Append new listings to existing ones
    }
  }, [jobListings]);

  return (
    <div>
      <AllSelect />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {(filteredListings.length > 0 ? filteredListings : allJobListings).map((job, index) => (
          <Box key={index} sx={{ flex: '0 0 25%', maxWidth: '25%' }}>
            <JobCard job={job} />
          </Box>
        ))}
      </Box>
    </div>
  );
}
