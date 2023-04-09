import { useState, useEffect } from "react";
import * as React from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';

import CardMedia from '@mui/material/CardMedia';

import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/user-profile/Header";

// import AuthService from "../../services/auth-service";

const UserProfile = () => {
  //for the modal dialog
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [notification, setNotification] = useState(false);
  const [fileImg, setFileImg] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    walletaddress: "",
    age: "",
    aadhar: "",
    pan: "",
    phone: "",
    filehash: "",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    ageError: false,
    aadharError: false,
    panError: false,
    phoneError: false
  });

  const sendFileToIPFS = async (e) => {
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);
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
        const ImgHash = `${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        setUser({ ...user, filehash: ImgHash });
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.   
      } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
      }
    }
  }

  // const getUserData = async () => {
  //   const response = await AuthService.getProfile();
  //   if (response.data.id == 1) {
  //     setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  //   }
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     ...response.data.attributes,
  //     currentPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   }));
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    var nameErr = false;
    var emailErr = false;
    var ageErr = false;
    var phoneErr = false;
    var panErr = false;
    var aadharErr = false;

    if (user.name.trim().length === 0) {
      nameErr = true;
    }

    if (user.age.trim().length === 0) {
      ageErr = true;
    }

    if (user.aadhar.trim().length === 0) {
      aadharErr = true;
    }

    if (user.pan.trim().length === 0) {
      panErr = true;
    }

    if (user.phone.trim().length === 0) {
      phoneErr = true;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      emailErr = true;
    }

    if (nameErr || emailErr || ageErr || phoneErr || panErr || aadharErr) {
      setErrors({
        nameError: nameErr,
        emailError: emailErr,
        ageError: ageErr,
        phoneError: phoneErr,
        panError: panErr,
        aadharError: aadharErr
      });
      return;
    }
    sendFileToIPFS();
    // let userData = {
    //   data: {
    //     type: "profile",
    //     attributes: {
    //       name: user.name,
    //       email: user.email,
    //       age:user.age,
    //       profile_image: null,
    //     },
    //   },
    // };
    // // set new user data for call
    // if (user.newPassword.length > 0) {
    //   userData = {
    //     data: {
    //       type: "profile",
    //       attributes: {
    //         ...user,
    //         profile_image: null,
    //         password: user.newPassword,
    //         password_new: user.newPassword,
    //         password_confirmation: user.confirmPassword,
    //       },
    //     },
    //   };
    // }

    // // call api for update
    // const response = await AuthService.updateProfile(JSON.stringify(userData));

    // reset errors
    setErrors({
      nameError: false,
      emailError: false,
      ageError: false,
      phoneError: false,
      panError: false,
      aadharError: false
    });

    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={user.name}>
        {notification && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
              Your profile has been updated
            </MDTypography>
          </MDAlert>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <MDTypography id="modal-modal-title" variant="h6" component="h2">
              Preview
            </MDTypography>
            <CardMedia>
              <img src={`https://ipfs.io/ipfs/${user.filehash}`}></img>
            </CardMedia>
          </MDBox>
        </Modal>
        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Name
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="name"
                  value={user.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                />
                {errors.nameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The name can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Wallet Address
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="walletaddress"
                  value={user.walletaddress}
                  onChange={changeHandler}
                  disabled={true}
                />
              </MDBox>
            </MDBox>
          </MDBox>
          {/* Age */}
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Age
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="age"
                  value={user.age}
                  onChange={changeHandler}
                  error={errors.ageError}
                />
                {errors.ageError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The age can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            {/* Email */}
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Email
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="email"
                  fullWidth
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  error={errors.emailError}
                />
                {errors.emailError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The email must be valid
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          {/* Aadhar */}
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Aadhar number
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="aadhar"
                  value={user.aadhar}
                  onChange={changeHandler}
                  error={errors.aadharError}
                />
                {errors.aadharError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The aadhar number can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            {/* Pan */}
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                PAN Number
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="pan"
                  value={user.pan}
                  onChange={changeHandler}
                  error={errors.panError}
                />
                {errors.panError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The pan must be valid
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>

          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Phone Number
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="phone"
                  value={user.phone}
                  onChange={changeHandler}
                  error={errors.phoneError}
                />
                {errors.phoneError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The phone number can not be null
                  </MDTypography>
                )}
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
                Upload Aadhar
              </MDTypography>
              <MDBox mb={1} width="70%">
                <input accept="image/*" multiple type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
              </MDBox>
              <MDButton variant="gradient" color="info" onClick={handleOpen}>
                <VisibilityIcon fontSize="inherit" />
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox display="flex" flexDirection="column" mb={3}>
            <MDBox display="flex"
              flexDirection="row"
              justifyContent="end"
              width="100%"
              mr={7}>
              <MDBox mt={4} display="flex" mr={3}>
                <MDButton variant="gradient" color="info" type="submit">
                  Request for Verification
                </MDButton>
              </MDBox>
              <MDBox mt={4} display="flex">
                <MDButton variant="gradient" color="info" type="submit">
                  Save changes
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
};

export default UserProfile;
