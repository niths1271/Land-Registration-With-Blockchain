import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// To fetch data from backend
import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "./LandRegistry.json";

export default function UserRequestViewTable() {

  const [userCount, setUserCount] = useState(0);
  const [details, setdetails] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
  });

  const [users, setUsers] = useState([]);

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
      const acc = await web3.eth.getAccounts();
      console.log(acc);
      for (let i = 0; i < acc.length; i++) {
        const user = await instance.methods.users(acc[i]).call();
        if (user.name && !user.verified) {
          setUsers(prevUsers => [...prevUsers, {
            Sl_no: i + 1,
            Account_Address:acc[i],
            Name: user.name,
            Age: user.age,
            Email: user.email,
            phone_num: user.phone_num,
            Aadhaar_Doc: <u><a href={`https://ipfs.io/ipfs/${user.aadharIpfsHash}`} target="_blank">Khata Document</a></u>,
            PAN_Number: user.pan_num,
            Verification_Request: (
              <MDBox ml={-1}>
                <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px", }} onClick={approveHandler(instance,acc[i])}>Approve</Button>
                  <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} onClick={rejectHandler(instance,acc[i])}>Reject</Button></div>
              </MDBox>
            )
          }]);
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }, []);

  const approveHandler = (instance,account)=>{
    instance.methods.verifyUser(account,true).send({ from:users.account}).then((res) => {
      console.log(res);
      console.log("User Verified Successfully");
      alert("User Profile Has been verified");
   })
  }

  const rejectHandler = (instance,account)=>{
    instance.methods.verifyUser(account,false).send({ from:users.account}).then((res) => {
      console.log(res);
      console.log("User Profile Rejected Successfully");
      alert("User Profile Has been rejected");
   })
}

  return {
    columns: [
      { Header: "Sl no", accessor: "Sl_no", width: "45%", align: "left" },
      { Header: "Account Address", accessor: "Account_Address", width: "45%", align: "left" },
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Age", accessor: "Age", align: "center" },
      { Header: "Email", accessor: "Email", align: "center" },
      { Header: "Phone Number", accessor: "phone_num", align: "center" },
      { Header: "Aadhaar Document", accessor: "Aadhaar_Doc", align: "left" },
      { Header: "PAN Number", accessor: "PAN_Number", align: "center" },
      { Header: "Verification Request", accessor: "Verification_Request", align: "center" },

    ],

    rows: users
  };

}



