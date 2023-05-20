import React, { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../Context/login-context";
import Button from "../Form-Elements/Button";
import Card from "../UI-Elements/Card";
import Text from "../Visual-Elements/Text";
import Avatar from "../UI-Elements/Avatar";
import Modal from "./Modal";

function Profile() {
  const loginContext = useContext(LoginContext);
  const [showConfirmModal,setShowConfirmModal] = useState(false);


  const isAdmin = loginContext.currentUser.isAdmin;

  const showLogoutWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelLogoutWarningHandler = () => {
    setShowConfirmModal(false);
  }

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
      <Avatar
       image={`http://localhost:5000/${loginContext.currentUser.imagePfp}`}
       alt={"- Missing User Pfp -"} 
       style={{width:"100px", hight:"50px"}}
      />
      {!isAdmin && (
        <React.Fragment>
          <Text value={`Username : ${loginContext.currentUser.username}`}/>
          <Text value={`Current Date & Time: ${new Date()}`}/>
          <Button to="/MainPage/User">
            Go To Profile | User
          </Button>
        </React.Fragment>
      )}
      {isAdmin && (
        <React.Fragment>
          <Text value={`Admin Name : ${loginContext.currentUser.username}`}/>
          <Text value={`Current Date : ${new Date()}`}/>
          <Button to="/MainPage/Admin">
            Go To Profile | Admin
          </Button>
        </React.Fragment>
      )}
      <Button to="/MainPage">
        To Main Page
      </Button>
      <Button onClick={showLogoutWarningHandler}>
        LOGOUT
      </Button>
    </Card>
  );
}

export default Profile;
