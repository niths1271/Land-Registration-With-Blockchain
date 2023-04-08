import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/user-profile/Header";

import AuthService from "../../services/auth-service";

const UserProfile = () => {
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    walletaddress:"",
    age:"",
    aadhar:"",
    pan:"",
    phone:""
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    ageError:false,
    aadharError:false,
    panError:false,
    phoneError:false
  });

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

    // validation
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    var nameErr=false;
    var emailErr=false;
    var ageErr=false;
    var phoneErr=false;
    var panErr=false;
    var aadharErr=false;

    if (user.name.trim().length === 0) {
      nameErr=true;
    }

    if (user.age.trim().length === 0) {
      ageErr=true;
    }

    if (user.aadhar.trim().length === 0) {
      aadharErr=true;
    }

    if (user.pan.trim().length === 0) {
      panErr=true;
    }

    if (user.phone.trim().length === 0) {
      phoneErr=true;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      emailErr=true;
    }

    if(nameErr || emailErr || ageErr || phoneErr || panErr || aadharErr){
      setErrors({nameError: nameErr,
        emailError: emailErr,
        ageError: ageErr,
        phoneError:phoneErr,
        panError:panErr,
        aadharError:aadharErr});
      return;
    }
      

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
      phoneError:false,
      panError:false,
      aadharError:false
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
              width="48%"
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
          </MDBox>
          
          <MDBox display="flex" flexDirection="column" mb={3}>
            <MDBox display="flex"
                flexDirection="row"
                justifyContent="end"
                width="100%"
                mr={7}>
            <MDBox mt={4} display="flex" mr={3}>
              <MDButton variant="gradient" color="info" type="submit">
                Verify
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
