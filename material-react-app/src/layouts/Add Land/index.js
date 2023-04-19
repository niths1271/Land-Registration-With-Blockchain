import { useState, useEffect } from "react";
import * as React from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import Card from "@mui/material/Card";
import getWeb3 from "getWeb3/getWeb3";
import LandRegistry from "./LandRegistry.json";

//Components for the calendar
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import AuthService from "../../services/auth-service";

const AddLand = () => {

  const [dummy, setDummy] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
  });

  const [notification, setNotification] = useState(false);

  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);

  const [year, setYear] = useState(null);
  const [land, setLand] = useState({
    area: "",
    city: "",
    state: "",
    pid: "",
    price: "",
  });

  const [errors, setErrors] = useState({
    areaError: false,
    cityError: false,
    stateError: false,
    pidError: false,
    priceError: false,
  });

  const sendFileToIPFS = async (e) => {
    if (doc1) {
      try {
        const formData = new FormData();
        formData.append("file", doc1);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${process.env.REACT_APP_PINATA_API_ACCESS_TOKEN}`
          },
        });
        const doc1Hash = `${resFile.data.IpfsHash}`;
        console.log(doc1Hash);
        setLand({ ...land, filehash: doc1Hash });
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.   
      } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
      }
    }
    setLand({
      area: "",
      city: "",
      state: "",
      pid: "",
      price: "",
    });

    setYear(null);
    setDoc1("");
    setDoc2("");
    // if (doc2) {
    //   try {
    //     const formData = new FormData();
    //     formData.append("file", doc2);
    //     const resFile = await axios({
    //       method: "post",
    //       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //       data: formData,
    //       headers: {
    //         'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
    //         'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
    //         "Content-Type": "multipart/form-data",
    //         'Authorization': `Bearer ${process.env.REACT_APP_PINATA_API_ACCESS_TOKEN}`
    //       },
    //     });
    //     const doc2Hash = `${resFile.data.IpfsHash}`;
    //     console.log(doc2Hash);
    //     setLand({ ...land, filehash: doc2Hash });
    //     //Take a look at your Pinata Pinned section, you will see a new file added to you list.   
    //   } catch (error) {
    //     console.log("Error sending File to IPFS: ")
    //     console.log(error)
    //   }
    // }
  }

  useEffect( async () => {
    try {
      //Get network provider and web3 instance
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LandRegistry.networks[networkId];
      const instance = new web3.eth.Contract(
          LandRegistry.abi,
          deployedNetwork && deployedNetwork.address,
      );
      setDummy({ LandInstance: instance, web3: web3, account: accounts[0] });


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
  },[]);


  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setLand({
      ...land,
      [e.target.name]: e.target.value,
    });
  };

  const addLand = async (area, city, state, pid, price) => {
   await dummy.LandInstance.methods.addLand(area, city, state, pid, price).send({ from: dummy.account}).then((res) => {
    setNotification(true);
    //window.location.reload(false);
    console.log(res);
   })
  }

  const submitHandler = async (e) => {
    console.log(land);
    console.log(year);
    e.preventDefault();

    var areaErr = false;
    var cityErr = false;
    var stateErr = false;
    var pidErr = false;
    var priceErr = false;

    if (land.area.trim().length === 0) {
      areaErr = true;
    }

    if (land.city.trim().length === 0) {
      cityErr = true;
    }

    // if (land.taluk.trim().length === 0) {
    //   talukErr = true;
    // }

    if (land.state.trim().length === 0) {
      stateErr = true;
    }

    if (land.pid.trim().length === 0) {
      pidErr = true;
    }

    // if (land.hissa.trim().length === 0) {
    //   hissaErr = true;
    // }

    // if (land.survey.trim().length === 0) {
    //   surveyErr = true;
    // }

    if (land.price.trim().length === 0) {
      priceErr = true;
    }

    if (areaErr || cityErr || stateErr || pidErr || priceErr) {
      setErrors({
        areaError: areaErr,
        cityError: cityErr,
        stateError: stateErr,
        pidError: pidErr,
        priceError: priceErr,
      });
      return;
    }

    sendFileToIPFS();

    addLand(land.area, land.city, land.state, land.pid, land.price);

    setErrors({
      areaError: false,
      cityError: false,
      stateError: false,
      pidError: false,
      priceError: false,
    });

    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{
        position: "relative",
        mt: 1,
        px: 2,
      }}>
        {notification && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
              Land details have been addded
            </MDTypography>
          </MDAlert>
        )}
        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            {/* Area */}
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Area(in sqm.)
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="area"
                  value={land.area}
                  onChange={changeHandler}
                  error={errors.areaError}
                />
                {errors.areaError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The area can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            {/* City */}
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                City
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="city"
                  value={land.city}
                  onChange={changeHandler}
                  error={errors.cityError}
                />
                {errors.cityError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The city can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          {/* Taluk */}
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            {/* <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Taluk
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="taluk"
                  value={land.taluk}
                  onChange={changeHandler}
                  error={errors.talukError}
                />
                {errors.talukError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    Taluk can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox> */}
            {/* State */}
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                State
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="state"
                  value={land.state}
                  onChange={changeHandler}
                  error={errors.stateError}
                />
                {errors.stateError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The state must be valid
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          {/* PID Number */}
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                PID Number
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="pid"
                  value={land.pid}
                  onChange={changeHandler}
                  error={errors.pidError}
                />
                {errors.pidError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    PID number can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            {/* Hissa NUmber */}
            {/* <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Hissa Number
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="hissa"
                  value={land.hissa}
                  onChange={changeHandler}
                  error={errors.hissaError}
                />
                {errors.hissaError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    Hissa number must be valid
                  </MDTypography>
                )}
              </MDBox>
            </MDBox> */}
          </MDBox>
          {/* Survey Number */}
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            {/* <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={3}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Survey Number
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="survey"
                  value={land.survey}
                  onChange={changeHandler}
                  error={errors.surveyError}
                />
                {errors.surveyError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The survey number can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox> */}
            {/* Price */}
           <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={3}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Price (Enter in rupees)
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="price"
                  value={land.price}
                  onChange={changeHandler}
                  error={errors.priceError}
                />
                {errors.priceError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The price can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            {/* Year of purchase */}
            {/* <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Year of Purchase
              </MDTypography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={year}
                  onChange={(newYear) => { setYear(dayjs(newYear)) }}
                  required
                />
                {errors.yearError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    Year can not be null
                  </MDTypography>
                )}
              </LocalizationProvider>
            </MDBox> */}
          </MDBox>

          

          {/* Documents Upload */}
          {/* <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
              mt={1}
            >
              <MDTypography variant="body2" color="text" mr={5} fontWeight="regular" width="100%">
                Upload Sale Deed
              </MDTypography>
              <MDBox mb={1} width="70%">
                <input accept="image/*" multiple type="file" onChange={(e) => setDoc1(e.target.files[0])} required />
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
              mt={1}
            >
              <MDTypography variant="body2" color="text" mr={5} fontWeight="regular" width="100%">
                Upload Khata Certificate
              </MDTypography>
              <MDBox mb={1} width="70%">
                <input accept="image/*" multiple type="file" onChange={(e) => setDoc2(e.target.files[0])} required />
              </MDBox>
            </MDBox>
          </MDBox> */}

          <MDBox display="flex" flexDirection="column" mb={3}>
            <MDBox mt={4} mr={7} display="flex" flexDirection="row"
              justifyContent="end">
              <MDButton variant="gradient" color="info" type="submit">
                SUBMIT
              </MDButton>
            </MDBox>
          </MDBox>
          
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default AddLand;
