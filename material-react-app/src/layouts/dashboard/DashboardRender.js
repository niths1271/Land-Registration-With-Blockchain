// @mui material components
import Grid from "@mui/material/Grid";
import OutForSale from "assets/images/OutForSale.jpg";
import Owned from "assets/images/Owned.jpg";
import Pending from "assets/images/Pending.jpg";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import MDAlert from "components/MDAlert";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Projects from "layouts/dashboard/components/Projects";

import { useState, useEffect } from "react";

import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "abis/LandRegistry.json";

export default function DashboardRender (){
  const [registered, setRegistered] = useState(true);
  const [verified, setverified] = useState(true);
  useEffect(async () => {
    if(!window.location.hash){
      window.location = window.location + '#loaded';
      window.location.reload();
  }
    try {
      //Get network provider and web3 instance
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await LandRegistry.networks[networkId];
      const instance = await new web3.eth.Contract(
        LandRegistry.abi,
        deployedNetwork && deployedNetwork.address,
      );
      var registered1 = await instance.methods.isRegistered(accounts[0]).call();
      console.log(registered1);
      setRegistered(registered1);
      var verified1=await instance.methods.getUserVerificationStatus(accounts[0]).call();
      setverified(verified1)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  },[]);

    return(
    <DashboardLayout>
      <DashboardNavbar />
      {!registered && (
          <MDAlert color="warning" mt="20px">
            <MDTypography variant="body2" color="white">
              Please complete your profile to participate in futher activities.
            </MDTypography>
          </MDAlert>
        )}
        {!verified && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
              Profile verification pending.
            </MDTypography>
          </MDAlert>
        )}
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Owned}
                      alt="Owned"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Lands Owned
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        Total Number Of Lands Owned By You Currently !
                        
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
              <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Pending}
                      alt="Pending"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Pending Verification
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        Lands Under Verification Currently By Admin!
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
               
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      width="50%"
                      src={OutForSale}
                      alt="OutForSale"
                      align="center"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Lands For Sale
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        Total Number Of Lands Out For Sale Currently !
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
             
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
    );
}