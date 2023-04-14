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

function createData(AccountAddress, Name, age, Email, City, AadhaarNumber, PANNumber, VerificationStatus) {
  return { AccountAddress, Name, age, Email, City, AadhaarNumber, PANNumber, VerificationStatus };
}

const rows = [
  createData(14454468613125, 159, 6.0, 24, 4.0, 23, 25, 234),
  createData(7638376482634234, 159, 6.0, 24, 4.0, 23, 25, 234),
  createData(324238976987234, 159, 6.0, 24, 4.0, 23, 25, 234),
];

export default function UserViewTable() {
  return (
    <>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>A basic table example with a caption</caption>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Account Address</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">age</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Aadhaar Number</TableCell>
                    <TableCell align="right">PAN Number</TableCell>
                    <TableCell align="right">Verification Status</TableCell>
                    <TableCell align="right">Verify</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.AccountAddress}>
                        <TableCell component="th" scope="row">
                            {row.AccountAddress}
                        </TableCell>
                        <TableCell component="th" scope="row">{row.Name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.Email}</TableCell>
                        <TableCell>{row.City}</TableCell>
                        <TableCell>{row.AadhaarNumber}</TableCell>
                        <TableCell>{row.PANNumber}</TableCell>
                        <TableCell>{row.VerificationStatus}</TableCell>
                        <TableCell><Button variant="contained" style={{ backgroundColor: "black" }}>Verify</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  );
}