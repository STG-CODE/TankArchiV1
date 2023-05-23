//basic imports
import React, { useState } from "react";
import { useContext } from "react";
//context import
import { LoginContext } from "../../Context/login-context";
//component imports
import Button from "../Form-Elements/Button";
import Card from "../UI-Elements/Card";
import Text from "../Visual-Elements/Text";
import Avatar from "../UI-Elements/Avatar";
import Modal from "./Modal";
//Material UI imports
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";

function Profile() {
  //login context
  const loginContext = useContext(LoginContext);
  //alert state for when user wants to logout
  const [showConfirmModal,setShowConfirmModal] = useState(false);

  //contains bool value of "isAdmin"
  const isAdmin = loginContext.currentUser.isAdmin;

  //sets the state of showing the warning window to "true"
  const showLogoutWarningHandler = () => {
    setShowConfirmModal(true);
  };

  //sets the state of showing the warning window to "false"
  const cancelLogoutWarningHandler = () => {
    setShowConfirmModal(false);
  }

  //handles the actions that are to be taken if user confirms their decision
  const confirmLogoutWarningHandler = event => {
    event.preventDefault();
    setShowConfirmModal(false);
    console.log("Logging User Out!")
    loginContext.logout()
  };

  return (
    <Card>
      <Modal
        show={showConfirmModal}
        onCancel={cancelLogoutWarningHandler}
        header="Are You Sure You Want To Logout?"
        footerClass=""
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelLogoutWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmLogoutWarningHandler}>
              LOGOUT
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you wish to logout from your account?</p>
      </Modal>
      <Grid2 container spacing={2}>
        <Grid2 xs={4}>
          <Avatar
            image={`http://localhost:5000/${loginContext.currentUser.imagePfp}`}
            alt={"- Missing User Pfp -"} 
            style={{width:"200px", hight:"50px"}}
          />
        </Grid2>
        <Grid2 xs={8}>
        {!isAdmin && (
        <React.Fragment>
          <Text value={`Username : ${loginContext.currentUser.username}`}/>
          <Text value={`Full Name : ${loginContext.currentUser.firstName} ${loginContext.currentUser.lastName}`}/>
          <Text value={`Country Of Origin : ${loginContext.currentUser.country}`}/>
          <Text value={`Last Login Date : ${loginContext.currentUser.lastLoginDate}`}/>
        </React.Fragment>
        )}
        {isAdmin && (
        <React.Fragment>
          <Text value={`Username : ${loginContext.currentUser.username}`}/>
          <Text value={`Full Name : ${loginContext.currentUser.firstName} ${loginContext.currentUser.lastName}`}/>
          <Text value={`Admin Staff Role : ${loginContext.currentUser.adminRole}`}/>
        </React.Fragment>
        )}
        <Text value={`Current Date & Time : ${new Date()}`}/>
        </Grid2>
        <Container maxWidth="xl" fixed>
        <Grid2 container xs={12}>
          {!isAdmin && (
            <Button to="/MainPage/User">
              Go To User Profile
            </Button>
          )}
          {isAdmin && (
            <Button to="/MainPage/Admin">
              Go To Admin Profile
            </Button>
          )}
          <Button to="/MainPage">
            To Main Page
          </Button>
          <Button onClick={showLogoutWarningHandler}>
            LOGOUT
          </Button>
        </Grid2>
        </Container>
      </Grid2>
    </Card>
  );
}

export default Profile;
