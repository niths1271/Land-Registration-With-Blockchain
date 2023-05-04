import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "./LandRegistry.json";

function AdminDashboard() {

  const [userCount, setUserCount] = useState(0);
  const [verfiedUsers, setverfiedUsers] = useState(0);
  const [verfiedLand, setverfiedLand] = useState(0);
  const [landCount, setLandCount] = useState(0);

  const [details, setdetails] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
  });

  useEffect(async () => {
    if (!window.location.hash) {
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
      setdetails({ LandInstance: instance, web3: web3, account: accounts[0] });
      const userCount = await instance.methods.userCount().call();
      setUserCount(userCount);
      const totalUsers = await instance.methods.getUsers().call();
      for (let i = 0; i < totalUsers.length; i++) {
        const user = await instance.methods.users(totalUsers[i]).call();
        if (!user.verified) {
          verfiedUsers=verfiedUsers+1;          
        }
      }
      setverfiedUsers(verfiedUsers);
      const landCount = await instance.methods.landCount().call();
      setLandCount(landCount);
      for (let i = 0; i < landCount; i++) {
        const land = await instance.methods.lands(i).call();
        if (!land.verified) {
          verfiedLand=verfiedLand+1;
        }
      }
      setverfiedLand(verfiedLand);
      console.log("user count",userCount);
      console.log("land count",landCount);
      console.log(totalUsers);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person"
                title="Users Count"
                count={userCount}
                percentage={{
                  color: "success",
                  label: "total registered",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="land"
                title="Total Lands"
                count={landCount}
                percentage={{
                  color: "success",
                  label: "total registered",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="unverfied Users"
                count={verfiedUsers}
                percentage={{
                  color: "success",
                  label: "unverified",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="unverfied Lands"
                count={verfiedLand}
                percentage={{
                  color: "success",
                  label: "unverified",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        </MDBox>
    </DashboardLayout>
  );
}

export default AdminDashboard;
