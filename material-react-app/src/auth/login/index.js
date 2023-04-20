import { useContext, useState, useEffect } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import metamaskLogo from "assets/images/logos/gray-logos/metamask-icon.svg"
// import AuthService from "services/auth-service";
// import { AuthContext } from "context";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  //MetaMask integration

  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      sessionStorage.setItem("login",false);
      navigate("/auth/login");
      alert("Please install MetaMask")
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          // Navigate to dashboard if wallet connected          
          setWalletAddress(accounts[0]);

          sessionStorage.setItem("login",true);
          console.log("sessionStorage set");

          navigate("/dashboard");
          
          console.log(accounts[0]);
        } else {
          sessionStorage.setItem("login",false);
          navigate("/auth/login");
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        sessionStorage.setItem("login",true);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      sessionStorage.setItem("login",false);
      navigate("/auth/login");
      console.log("Please install MetaMask");
    }
  };

  //Till HERE

  return (
    <BasicLayoutLanding image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
            <div>
              <img src={metamaskLogo} alt="metamask logo"/>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mt={2} mb={1} >
              <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={connectWallet}>
                  <span className="is-link has-text-weight-bold">
                      {walletAddress && walletAddress.length > 0
                        ? `Connected: ${walletAddress.substring(
                            0,
                            6
                          )}...${walletAddress.substring(38)}`
                        : "Connect Wallet"}
                  </span>
              </MDButton>
              {errorMessage && <div style={{ color: "red",fontSize: "15px" }}> {errorMessage} <a target="_blank" href="https://metamask.io/download/">here!</a> </div>}
            </MDBox>
        </MDBox>
      </Card>
    </BasicLayoutLanding>
  );
}

export default Login;
