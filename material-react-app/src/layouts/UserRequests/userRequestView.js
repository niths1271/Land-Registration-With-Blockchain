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
      const acc = [
        '0x9866EC02daB89A799eC4c6AAB429951e66AD2844',
        '0x003a7514361FcE1e0b353a2E18a4Dd35B149D3e9',
        '0xc430b4C918CC4aDa258aed41de81B0E5678b1843',
        '0xa4748C4FDd76bC98aB33e7f3345E8EbEff203174',
        '0x347EafB7EEdaEc254758Ac746046fA1CD06A30F0',
        '0x7E282394badb9BF2C5191F0AE0CED46684Ef1D52',
        '0xcA2075ABC4f4612C5E825844Cfe48cE1fe450bc0',
        '0xcC169f35303F2B4E0E68Ce81a8dDF510a7B6b712',
        '0x0D6c48DbcA5aD560Cc4D0246717297deD94DB900',
        '0xf7660b080B5C46C37F3f9FD36F95893058D75dE0'
      ];
      for (let i = 0; i < acc.length; i++) {
        const user = await instance.methods.users(acc[i]).call();
        if (user.name && !user.verified) {
          setUsers(prevUsers => [...prevUsers, {
            // Sl_no: i + 1,
            Account_Address:acc[i],
            Name: user.name,
            Age: user.age,
            Email: user.email,
            phone_num: user.phone_num,
            Aadhaar_Doc: <u><a href={`https://ipfs.io/ipfs/${user.aadharIpfsHash}`} target="_blank">Khata Document</a></u>,
            PAN_Number: user.pan_num,
            Verification_Request: (
              <MDBox ml={-1}>
                <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px", }} onSubmit={approveHandler(instance,acc[i],accounts[0])}>Approve</Button>
                  <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} onSubmit={rejectHandler(instance,acc[i],accounts[0])}>Reject</Button></div>
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

  const approveHandler = (instance,account,acc)=>{
  //   instance.methods.verifyUser(account,true).send({ from:acc}).then((res) => {
  //     console.log(res);
  //     console.log("User Verified Successfully");
  //     alert("User Profile Has been verified");
  //  })
  }

  const rejectHandler = (instance,account,acc)=>{
  //   instance.methods.verifyUser(account,false).send({ from:acc}).then((res) => {
  //     console.log(res);
  //     console.log("User Profile Rejected Successfully");
  //     alert("User Profile Has been rejected");
  //  })
}

  return {
    columns: [
      // { Header: "Sl no", accessor: "Sl_no", width: "45%", align: "left" },
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



