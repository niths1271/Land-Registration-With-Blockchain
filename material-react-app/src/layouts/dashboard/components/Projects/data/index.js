import { useState, useEffect } from "react";
import * as React from 'react';
// @mui material components
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";

// Images

import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "./LandRegistry.json";


export default function data() {


  const [details, setdetails] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
  });

  const [landCount, setLandCount] = useState(0);
  const [lands, setLands] = useState([]);


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
      const landCount = await instance.methods.landCount().call();
      setLandCount(landCount);
      for (let i = 0; i < landCount; i++) {
        const land = await instance.methods.lands(i).call();
        if (land.owner == accounts[0]) {
          setLands(prevLands => [...prevLands, {
            Property_ID: land.pid,
            Survey_No: land.survey,
            Hissa_No: land.hissa,
            Land_Khata: <u><a href={`https://ipfs.io/ipfs/${land.doc_hash}`} target="_blank">Khata Document</a></u>,
            Estimated_Price: land.price,
            Verification_Status: land.verified ? <MDBox ml={-1}>
              <MDBadge badgeContent="VERIFIED" color="success" variant="gradient" size="sm" />
            </MDBox> : <MDBox ml={-1}>
              <MDBadge badgeContent="NOT VERIFIED" color="dark" variant="gradient" size="sm" />
            </MDBox>
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
      { Header: "Property_ID", accessor: "Property_ID", align: "left" },
      { Header: "Survey_No", accessor: "Survey_No", align: "left" },
      { Header: "Hissa_No", accessor: "Hissa_No", align: "left" },
      { Header: "Land Khata", accessor: "Land_Khata", width: "15%", align: "left" },
      { Header: "Estimated_Price", accessor: "Estimated_Price", width: "15%", align: "left" },
      { Header: "Verification Status", accessor: "Verification_Status", width: "15%", align: "left" },
    ],
    rows: lands
  };
}
