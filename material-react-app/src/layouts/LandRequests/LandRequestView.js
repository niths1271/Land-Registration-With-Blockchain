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



export default function LandRequestViewTable() {
    return {
      columns: [
        { Header: "Sl_No", accessor: "Sl_No", width: "45%", align: "left" },
        { Header: "Property_ID", accessor: "Property_ID", align: "left" },
        { Header: "Survey_No", accessor: "Survey_No", align: "center" },
        { Header: "Hissa_No", accessor: "Hissa_No", align: "center" },
        { Header: "Land Khata", accessor: "Land_Khata", align: "center" },
        { Header: "Estimated Price", accessor: "Estimated_Price", align: "left" },
        { Header: "Verification Status", accessor: "Verification_Status", align: "center" },
      
      ],
  
      rows: [
        {
          Sl_No:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              1
            </MDTypography>
          ),
          Property_ID:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              23515184626198626198492526548451
            </MDTypography>
          ) ,
          Survey_No: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              21
            </MDTypography>
          ) ,
          Hissa_No:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            84626198626548451
            </MDTypography>
          )  ,
          Land_Khata:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <a href="#">KHATA_DOCUMENT</a>
            </MDTypography>
          )  ,
          Estimated_Price: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              5155154.12
            </MDTypography>
          )  ,
          Verification_Status:  (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px" }}>Verify</Button>
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }}>Reject</Button></div>
            </MDTypography>
          ) 
        },
        {
          Sl_No:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              2
            </MDTypography>
          ),
          Property_ID:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              23515184626198626198492526548451
            </MDTypography>
          ) ,
          Survey_No: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              21
            </MDTypography>
          ) ,
          Hissa_No:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            84626198626548451
            </MDTypography>
          )  ,
          Land_Khata:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <a href="#">KHATA_DOCUMENT</a>
            </MDTypography>
          )  ,
          Estimated_Price: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              5155154.12
            </MDTypography>
          )  ,
          Verification_Status:  (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px" }}>Verify</Button>
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }}>Reject</Button></div>
            </MDTypography>
          ) 
        },
        {
          Sl_No:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              3
            </MDTypography>
          ),
          Property_ID:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              23515184626198626198492526548451
            </MDTypography>
          ) ,
          Survey_No: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              21
            </MDTypography>
          ) ,
          Hissa_No:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            84626198626548451
            </MDTypography>
          )  ,
          Land_Khata:(
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <a href="#">KHATA_DOCUMENT</a>
            </MDTypography>
          )  ,
          Estimated_Price: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              5155154.12
            </MDTypography>
          )  ,
          Verification_Status:  (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px" }}>Verify</Button>
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }}>Reject</Button></div>
            </MDTypography>
          ) 
        },
      ]
    };
  
}



