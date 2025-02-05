/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Account Address", accessor: "Account_Address", width: "45%", align: "left" },
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Age", accessor: "Age", align: "center" },
      { Header: "Email", accessor: "Email", align: "center" },
      { Header: "City", accessor: "City", align: "center" },
      { Header: "Aadhaar Number", accessor: "Aadhaar_Number", align: "left" },
      { Header: "PAN Number", accessor: "PAN_Number", align: "center" },
      { Header: "Verification Status", accessor: "Verification_Status", align: "center" },
      
    ],

    rows: [
      {
        Account_Address:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23515184626198626198492526548451
          </MDTypography>
        ),
        Name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Mithun
          </MDTypography>
        ) ,
        Age: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            21
          </MDTypography>
        ) ,
        Email:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            mithunrk.cs9@bmsce.ac.in
          </MDTypography>
        )  ,
        City:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            bangalore
          </MDTypography>
        )  ,
        Aadhaar_Number: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            51551545262645
          </MDTypography>
        )  ,
        PAN_Number:  (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            32548155151
          </MDTypography>
        ) ,
        Verification_Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Verified" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Account_Address:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23515184626198626198492526548451
          </MDTypography>
        ),
        Name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Mithun
          </MDTypography>
        ) ,
        Age: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            21
          </MDTypography>
        ) ,
        Email:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            mithunrk.cs9@bmsce.ac.in
          </MDTypography>
        )  ,
        City:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            bangalore
          </MDTypography>
        )  ,
        Aadhaar_Number: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            51551545262645
          </MDTypography>
        )  ,
        PAN_Number:  (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            32548155151
          </MDTypography>
        ) ,
        Verification_Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Verified" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Account_Address:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23515184626198626198492526548451
          </MDTypography>
        ),
        Name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Mithun
          </MDTypography>
        ) ,
        Age: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            21
          </MDTypography>
        ) ,
        Email:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            mithunrk.cs9@bmsce.ac.in
          </MDTypography>
        )  ,
        City:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            bangalore
          </MDTypography>
        )  ,
        Aadhaar_Number: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            51551545262645
          </MDTypography>
        )  ,
        PAN_Number:  (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            32548155151
          </MDTypography>
        ) ,
        Verification_Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Verified" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      // {
      //   author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      //   function: <Job title="Programator" description="Developer" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       11/01/19
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      //   function: <Job title="Executive" description="Projects" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       19/09/17
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      //   function: <Job title="Programator" description="Developer" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       24/12/08
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
      //   function: <Job title="Manager" description="Executive" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       04/10/21
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      //   function: <Job title="Programator" description="Developer" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       14/09/20
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
    ],
  };
}
