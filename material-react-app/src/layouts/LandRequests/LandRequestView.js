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

  const approveHandler = (event,instance,id,admin) => {
    event.stopPropagation();
    instance.methods.verifyLand(parseInt(id),true).send({ from: admin,gas: 2100000 }).then((res) => {
      alert("Land Has been verified");
      window.location.reload(false);
    })
  }

  const rejectHandler = (event,instance,id,admin) => {
    event.stopPropagation();
    instance.methods.verifyLand(parseInt(id),false).send({ from: admin,gas: 2100000}).then((res) => {
      alert("Land Has been rejected");
      window.location.reload(false);
    })
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
            Approve: (
              <Button variant="contained" style={{ backgroundColor: "black", marginRight: "5px", }} onClick={(e)=>approveHandler(e,instance,land.id, accounts[0])}>Approve</Button>
            ),
            Reject:(
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} onClick={(e)=>rejectHandler(e,instance,land.id,accounts[0])}>Reject</Button>
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
        { Header: "Approve", accessor: "Approve", align: "center" },
        { Header: "Reject", accessor: "Reject", align: "center" },
      ],
  
      rows: lands,
    };
  
}



