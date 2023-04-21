import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// To fetch data from backend
import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "./LandRegistry.json";

export default function LandRequestViewTable() {

  const [landCount, setLandCount] = useState(0);
  const [details, setdetails] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
  });

  const [lands, setLands] = useState([]);

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
      const landC = await instance.methods.landCount().call();
      console.log(landC);
      setLandCount(landC);
      for (let i = 0; i < landC; i++) {
        const land = await instance.methods.lands(i).call();
        if (!land.verified) {
          setLands(prevLands => [...prevLands, {
            // Sl_no: i + 1,
            Owner:land.owner,
            Property_ID: land.pid,
            Survey_No: land.survey,
            Hissa_No: land.hissa,
            Land_Khata: <u><a href={`https://ipfs.io/ipfs/${land.doc_hash}`} target="_blank">Khata Document</a></u>,
            Estimated_Price:land.price,
            Verification_Request: (
              <MDBox ml={-1}>
                <div><Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px", }} >Approve</Button>
                  <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} >Reject</Button></div>
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

    return {
      columns: [
        // { Header: "Sl_No", accessor: "Sl_No", width: "45%", align: "left" },
        { Header: "Owner Address", accessor: "Owner", align: "left" },
        { Header: "Property_ID", accessor: "Property_ID", align: "left" },
        { Header: "Survey_No", accessor: "Survey_No", align: "center" },
        { Header: "Hissa_No", accessor: "Hissa_No", align: "center" },
        { Header: "Land Khata", accessor: "Land_Khata", align: "center" },
        { Header: "Estimated Price", accessor: "Estimated_Price", align: "left" },
        { Header: "Verification Request", accessor: "Verification_Request", align: "center" },
      
      ],
  
      rows: lands,
    };
  
}



