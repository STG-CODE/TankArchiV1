//basic imports
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
//hook import
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Card from "../../../../../../../../Shared/components/UI-Elements/Card";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import Image from "../../../../../../../../Shared/components/Visual-Elements/Image";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function ReviewUserBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded user state
  const [loadedUser, setLoadedUser] = useState();
  //extraction of the user id from the url
  const userId = useParams().userId;
  const history = useHistory();

  //useEffect - fetches the user for the propose of reviewing user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${userId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    console.log("Fetching The User!");
    fetchUser();
    console.log("Done Fetching The User!");
  }, [sendRequest, setLoadedUser]);

  //!create buttons for the possible options that the admin has!//

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && (
        <div className="Container">
          <Card>
            <Grid2 container spacing={1}>
              <Grid2 xs={12}>
                <Card>
                  <Text element="h2" value="Review User Page:"/>
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <Text element="text" value="User's Current Profile Picture:"/>
                  <Image
                  image={`http://localhost:5000/${loadedUser.imagePfp}`}
                  alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
                  style={{width:"30%", hight:"20%"}}
                  />
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <Text
                    label="User's Created Account Date:"
                    value={loadedUser.creationDate}
                  />
                  <Text
                    label="Last Logged In:"
                    value={loadedUser.lastLoginDate || "- User Didn't Login Yet -"}
                  />
                  <Text
                    label="Last Changes Made:"
                    value={loadedUser.lastAccountChanges ||
                      "- User's Details Didn't Change -"
                    }
                  />
                  <Text
                    label="Username:"
                    element="text"
                    value={loadedUser.username}
                  />
                  <Text label="Email:" element="text" value={loadedUser.email} />
                  <Text
                    label="First Name:"
                    element="text"
                    value={loadedUser.firstName}
                  />
                  <Text
                    label="Last Name:"
                    element="text"
                    value={loadedUser.lastName}
                  />
                  <Text
                    label="Country:"
                    element="text"
                    value={loadedUser.country}
                  />
                  <Text
                  label="Age:" 
                  element="text" 
                  value={loadedUser.age} 
                  />
                  <Text
                  label="Company:" 
                  element="text" 
                  value={loadedUser.company || " None"} 
                  />
                  <Text
                  label="Publisher:" 
                  element="text" 
                  value={loadedUser.publisher || " None"}
                  />
                  <Text
                    label="Association:"
                    element="text"
                    value={loadedUser.association || " None"}
                  />
                  <Text
                    label="Social Group Type:"
                    element="text"
                    value={loadedUser.socialType || " None"}
                  />
                  <Text
                    label="Social Group Name:"
                    element="text"
                    value={loadedUser.socialName || " None"}
                  />
                  <Text
                    label="Count Of Submitted Suggestions:"
                    element="text"
                    value={loadedUser.submittedSuggestions.length || " None"}
                  />
                  <Text
                    label="Count Of Favoured Tanks:"
                    element="text"
                    value={loadedUser.favTanksList.length || " None"}
                  />
                  <Text
                    label="User's Favorite Nation:"
                    element="text"
                    value={loadedUser.favNation || " None"}
                  />
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <Button to="/MainPage/Admin/UsersDatabase">
                    Go Back
                  </Button>
                  <Button to="/MainPage/Admin/UsersDatabase/EditUser">
                    Edit User
                  </Button >
                  <Button to="/MainPage/Admin/UsersDatabase">
                    Delete User
                  </Button>
                </Card>
              </Grid2>
            </Grid2>
          </Card>
        </div>
      )}
      {!isLoading && !error && !loadedUser && (
        <div>
          <h2>Could Not Find User Details For Review!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default ReviewUserBody;
