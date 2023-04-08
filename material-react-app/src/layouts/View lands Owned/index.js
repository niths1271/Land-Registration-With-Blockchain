import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import LandCard from './Components/LandCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LandsOwned() {
  return (
     <DashboardLayout>
      <DashboardNavbar />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <LandCard/>
        </Grid>
        <Grid item xs={4}>
          <LandCard/>
        </Grid>
        <Grid item xs={4}>
          <LandCard/>
        </Grid>
        <Grid item xs={4}>
          <LandCard/>
        </Grid>
      </Grid>
    </Box>
    </DashboardLayout>
  );
}