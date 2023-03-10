import React from "react";
import { useContext } from "react";
import { LoginContext } from "../../Context/login-context";
import Button from "../Form-Elements/Button";
import Card from "../UI-Elements/Card";
import Text from "../Visual-Elements/Text";
import Avatar from "../UI-Elements/Avatar";

function Profile() {
  const loginContext = useContext(LoginContext);

  const isAdmin = loginContext.currentUser.isAdmin;

  const onClickHandler = event => {
    event.preventDefault();
    console.log("Logging user out!")
    loginContext.logout()
  };

  return (
    <Card>
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
      <Button onClick={onClickHandler}>
        LOGOUT
      </Button>
    </Card>
  );
}

export default Profile;
