import React from "react";
import RoleSelect from "./SelectRoles";
import { Box } from "@mui/material";
import ExperienceSelect from "./SelectExperiance";
import RemoteSelect from "./SelectRemote";
import SalarySelect from "./SelectSalary";
import CompanyNameSearch from "./ComapanySearch";

export default function AllSelect(){
    return (
        <Box sx={{ display: 'flex' }}>
            <RoleSelect/>
            <ExperienceSelect/>
            <RemoteSelect/>
            <SalarySelect/>
            <CompanyNameSearch/>
        </Box>
    )
}