import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import LandViewTable from "./LandView";
import AccessibleTable from "./AdminDashboard";
import Button from '@mui/material/Button';

import UserViewTable from "./UserView";

function AdminDashboard() {
  const [Landvisible, setLandvisible] = useState(false);
  const [uservisible, setUservisible] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Button variant="contained" onClick={() => setLandvisible(!Landvisible)} style={{ backgroundColor: "black", float: "right", display: "inline-block" }}>View Lands</Button>
        <Button variant="contained" onClick={() => setUservisible(!uservisible)} style={{ backgroundColor: "black", marginLeft: "76%", position: "absolute"}}>View Users</Button>
       
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Users Info
                  </MDTypography>
                </MDBox>
                
                  <AccessibleTable/>
                
              </Card>
            </Grid>
          </Grid>
        </MDBox>


        {Landvisible && <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Land Info
                  </MDTypography>
                </MDBox>
                
                  <LandViewTable/>
                
              </Card>
            </Grid>
          </Grid>
        </MDBox>}

        {uservisible && <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Users 
                  </MDTypography>
                </MDBox>
                
                  <UserViewTable/>
                
              </Card>
            </Grid>
          </Grid>
        </MDBox>}

      </div> 

    </DashboardLayout>
  );
}

export default AdminDashboard;
