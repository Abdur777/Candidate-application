import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid } from '@mui/material';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  // Extract the first 100 characters of the job description
  const truncatedDescription = job.jobDetailsFromCompany.substring(0, 300);
  const MoretruncatedDescription = job.jobDetailsFromCompany.substring(0, 400);

  return (
    <Card variant="outlined" sx={{ margin: 3.5, borderRadius: 8, boxShadow: 3 }}>
      <CardContent sx={{ padding: 3.5 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Logo */}
          <Grid item xs={4}>
            <img src={job.logoUrl} alt={job.companyName} style={{ width: 50, height: 50, borderRadius: 4 }} />
          </Grid>
          {/* Company Name and Job Role */}
          <Grid item xs={8}>
            <Typography variant="h6" component="div">
              {job.companyName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {job.jobRole}
            </Typography>
          </Grid>
        </Grid>
        {/* Estimated Salary */}
        {/* Estimated Salary */}
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Estimated Salary: {job.minJdSalary ? `${job.minJdSalary} - ${job.maxJdSalary}` : job.maxJdSalary}
        </Typography>
      </Grid>

        {/* Job Description */}
        <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" paragraph>
              {expanded ? MoretruncatedDescription : truncatedDescription}
              {!expanded && job.jobDetailsFromCompany.length > 100 && (
                <Button onClick={toggleDescription} size="small">
                  Read More
                </Button>
              )}
              {expanded && (
                <Button onClick={toggleDescription} size="small">
                  Read Less
                </Button>
              )}
            </Typography>
          </Grid>
        {/* Apply Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" href={job.jobUrl} target="_blank" rel="noopener noreferrer">
            View Job
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobCard;
