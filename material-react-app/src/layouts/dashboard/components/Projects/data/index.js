/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react";
import * as React from 'react';
// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "./LandRegistry.json";


export default function data() {


  const [details, setdetails] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
  });

  const [landCount, setLandCount] = useState(0);
  const [lands, setLands] = useState([]);


  useEffect( async () => {
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
      const landCount = await  instance.methods.landCount().call();
      setLandCount(landCount);

      for (let i = 1; i <= landCount; i++) {
        const land = await instance.methods.lands(i).call();
        if (land.owner == accounts){
          setLands(prevLands => [...prevLands, land]);
        }
      }

  
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
  },[]);

  console.log(landCount);
  console.log(lands);

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  // const Company = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "Sl_No", accessor: "Sl_No", width: "5%", align: "left" },
      { Header: "Area", accessor: "Area", width: "15%", align: "left" },
      { Header: "City", accessor: "City", width: "15%", align: "left" },
      { Header: "State", accessor: "State", width: "15%", align: "left" },
      { Header: "Estimated_Price", accessor: "Estimated_Price", width: "15%", align: "left" },
      { Header: "Property_ID", accessor: "Property_ID", align: "left" },
      { Header: "Survey_No", accessor: "Survey_No", align: "left" },
      { Header: "Hissa_No", accessor: "Hissa_No", align: "left" },
    ],

    rows: [
      // { Sl_No :"1",
      //   Area: {lands[0].area},
      //   City: {lands[0].city},
      //   State: {lands[0].state},
      //   Estimated_Price: {lands[0].price},
      //   Property_ID: {lands[0].},
      // },
    ]
  };
}