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

export default function data() {
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
      { Sl_No :"1",
        Area: "Jai Nagar" ,
        City: "Kalaburagi",
        State: "Karnataka",
        Estimated_Price: "10,00,000",
        Property_ID: "114512",
        Survey_No: "47",
        Hissa_No: "10",
      },
      { Sl_No :"2",
        Area: "JP Nagar" ,
        City: "Banaglore",
        State: "Karnataka",
        Estimated_Price: "90,00,000",
        Property_ID: "125546",
        Survey_No: "87",
        Hissa_No: "15",
      },
      { Sl_No :"3",
        Area: "Sai Nagar" ,
        City: "Mumbai",
        State: "Maharastra",
        Estimated_Price: "55,00,000",
        Property_ID: "325265",
        Survey_No: "77",
        Hissa_No: "20",
      },
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
    ],
  };
}
