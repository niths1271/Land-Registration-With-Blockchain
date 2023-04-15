/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* land Page: https://www.creative-tim.com/land/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { useState, useEffect } from "react";
import * as React from 'react';
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
import getWeb3 from "getWeb3/getWeb3.js";
import LandRegistry from "./LandRegistry.json";


export default function data() {

  const [dummy, setDummy] = useState({
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
      const deployedNetwork = LandRegistry.networks[networkId];
      const instance = new web3.eth.Contract(
          LandRegistry.abi,
          deployedNetwork && deployedNetwork.address,
      );
      setDummy({ LandInstance: instance, web3: web3, account: accounts[0] });
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

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Area</th>
          <th scope="col">City</th>
          <th scope="col">State</th>
          <th scope="col">Pid</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody id="landList">
        {lands.map((land, key) => (
          <tr key={key}>
            <th scope="row">{land.id.toString()}</th>
            <td>{land.area}</td>
            <td>{land.city}</td>
            <td>{land.state}</td>
            <td>{land.pid}</td>
            <td>{land.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
      // {
      //   companies: <Company image={logoXD} name="Material UI XD Version" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team1, "Ryan Tompson"],
      //         [team2, "Romina Hadid"],
      //         [team3, "Alexander Smith"],
      //         [team4, "Jessica Doe"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $14,000
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={60} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoAtlassian} name="Add Progress Track" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team2, "Romina Hadid"],
      //         [team4, "Jessica Doe"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $3,000
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={10} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // }
      // {
      //   companies: <Company image={logoSlack} name="Fix Platform Errors" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team1, "Ryan Tompson"],
      //         [team3, "Alexander Smith"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       Not set
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={100} color="success" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoSpotify} name="Launch our Mobile App" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team4, "Jessica Doe"],
      //         [team3, "Alexander Smith"],
      //         [team2, "Romina Hadid"],
      //         [team1, "Ryan Tompson"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $20,500
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={100} color="success" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoJira} name="Add the New Pricing Page" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([[team4, "Jessica Doe"]])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $500
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={25} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoInvesion} name="Redesign New Online Shop" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team1, "Ryan Tompson"],
      //         [team4, "Jessica Doe"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $2,000
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={40} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
}
