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
import { useState, useEffect } from "react";
import * as React from 'react';
// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "components/MDAvatar";


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
    console.log("entering useEffect");
    if(!window.location.hash){
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
      for (let i = 0; i <= landCount; i++) {
        const land = await instance.methods.lands(i).call();
        if (land.owner == accounts[0]) {
          setLands(prevLands => [...prevLands, {
            Sl_No:i+1,
            Property_ID:land.pid,
            Survey_No:land.survey,
            Hissa_No:land.hissa,
            Land_Khata:land.doc_hash,
            Estimated_Price: land.price,
            Verification_Status: String(land.verified)
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
      { Header: "Sl_No", accessor: "Sl_No", width: "5%", align: "left" },
      { Header: "Property_ID", accessor: "Property_ID", align: "left" },
      { Header: "Survey_No", accessor: "Survey_No", align: "left" },
      { Header: "Hissa_No", accessor: "Hissa_No", align: "left" },
      { Header: "Land Khata", accessor: "Land_Khata", width: "15%", align: "left" },
      { Header: "Estimated_Price", accessor: "Estimated_Price", width: "15%", align: "left" },
      { Header: "Verification Status", accessor: "Verification_Status", width: "15%", align: "left" },
    ],
    rows:lands
    // {
    //   Sl_No:"1",
    //   Property_ID:"123",
    //   Survey_No:"234",
    //   Hissa_No:"12",
    //   Land_Khata:"Eqeqeqe",
    //   Estimated_Price:"21212",
    //   Verification_Status:"true"
    // }
    // // { Sl_No :"1",
    // //   Area: {lands[0].area},
    // //   City: {lands[0].city},
    // //   State: {lands[0].state},
    // //   Estimated_Price: {lands[0].price},
    // //   Property_ID: {lands[0].},
    // // },
  };
}

// doc_hash: "Qmd6NNPEXhpjzfcUVLePRXb9E2Pr6B4NEu8iHbEs8xaAVh"
// hissa: "121"
// id: "0"
// owner: "0x347EafB7EEdaEc254758Ac746046fA1CD06A30F0"
// pid: "112"
// price: "313131313"
// survey: "131313"
// verified: false