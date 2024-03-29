//basic imports
import React, { useContext, useEffect, useState } from "react";
//context import
import { LoginContext } from "../../../Shared/Context/login-context";
//hook import
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
//component imports
import UserDetailsBar from "../shared/DetailsBar";
import UserDetails from "../shared/Details";
import UserOptionalDetails from "../shared/OptionalDetails";
import UserSuggestionsTable from "./components/UserSuggestionTable";
import UserOptions from "./components/UserOptions";
import Button from "../../../Shared/components/Form-Elements/Button";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Card from "../../../Shared/components/UI-Elements/Card";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function User() {
  //login context
  const loginContext = useContext(LoginContext);
  //loaded user state
  const [loadedUser, setLoadedUser] = useState();
  //upToDate user state
  const [upToDateUser, setUpToDateUser] = useState(true);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //get the user's id from the login context
  const userId = loginContext.currentUser.id;

  //useEffect - makes changes to the user in accordance with any changes that are made
  useEffect(() => {
    const userInfoChangeHandler = async() => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${userId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setUpToDateUser(true);
        setLoadedUser(responseData.user);
        loginContext.refreshUser(responseData.user);
        console.log("Updated User Information");
      } catch (err) {}
    };
    userInfoChangeHandler();

  }, [sendRequest, setLoadedUser, upToDateUser]);

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
          <Grid2 container spacing={1}>
            <Grid2 xs={4}>
              <Card>
                <Text
                  element="h1"
                  value={"Hello " + loginContext.currentUser.username + "!"}
                />
              </Card>
            </Grid2>
            <Grid2 xs={8}>
              <Card>
                <UserDetailsBar user={loginContext.currentUser} />
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <UserDetails isUpToDate={setUpToDateUser} user={loginContext.currentUser} />
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <UserOptionalDetails isUpToDate={setUpToDateUser} user={loginContext.currentUser} />
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <UserSuggestionsTable isUpToDate={setUpToDateUser}/>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <UserOptions />
              </Card>
            </Grid2>
          </Grid2>
          <div>
              <Button to={"/MainPage"}>Go Back</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default User;
