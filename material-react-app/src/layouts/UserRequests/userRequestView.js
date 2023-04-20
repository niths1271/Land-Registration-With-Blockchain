import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MDTypography from "components/MDTypography";

/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";



export default function UserRequestViewTable() {
  
    return {
      columns: [
        { Header: "Account Address", accessor: "Account_Address", width: "45%", align: "left" },
        { Header: "Name", accessor: "Name", align: "left" },
        { Header: "Age", accessor: "Age", align: "center" },
        { Header: "Email", accessor: "Email", align: "center" },
        { Header: "City", accessor: "City", align: "center" },
        { Header: "Aadhaar Number", accessor: "Aadhaar_Number", align: "left" },
        { Header: "PAN Number", accessor: "PAN_Number", align: "center" },
        { Header: "Verification Request", accessor: "Verification_Request", align: "center" },
        
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
          Verification_Request: (
            <MDBox ml={-1}>
              <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px" }}>Verify</Button>
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }}>Reject</Button></div>
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
          Verification_Request: (
            <MDBox ml={-1}>
              <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px" }}>Verify</Button>
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }}>Reject</Button></div>
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
          Verification_Request: (
            <MDBox ml={-1}>
              <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px",  }}>Verify</Button>
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }}>Reject</Button></div>
            </MDBox>
          ),
        },
        
      
      ],
    };
  
}



