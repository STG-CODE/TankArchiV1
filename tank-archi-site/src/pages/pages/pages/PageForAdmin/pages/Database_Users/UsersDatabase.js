//basic imports
import React, { useContext, useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
//component imports
import UsersList from "./components/UsersList";
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Button from "../../../../../Shared/components/Form-Elements/Button";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
//context import
import { LoginContext } from "../../../../../Shared/Context/login-context";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Card from "../../../../../Shared/components/UI-Elements/Card";

function UsersDatabase() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  //loaded user state
  const [loadedUsers, setLoadedUsers] = useState();

  //useEffect - fetches for us all the users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/MainPage/Admin/UsersDatabase',
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  //handles the visual deletion of the user if and after the admin chooses to do so
  const userDeletedHandler = deletedUserId => {
    setLoadedUsers(loadedUsers.filter(user => user.id !== deletedUserId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Grid2 container spacing={1}>
        <Grid2 xs={12}>
          <Card>
            <Button inverse to="/MainPage/Admin/UsersDatabase/AddUser">
              Create User
            </Button>
          </Card>
        </Grid2>
        {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
        )}
        {!isLoading && loadedUsers && (
          <div className="Container">
            <Grid2 xs={12}>
              <Grid2 xs={12}>
                <Card>
                  <Grid2 xs={12}>
                    <Text element="h2" value="Users Management Page:" />
                  </Grid2>
                  <Grid2 xs={12}>
                    <UsersList items={loadedUsers} onDeleteUser={userDeletedHandler}/>
                  </Grid2>
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <Button to="/MainPage/Admin">Go Back</Button>
                  <Button to="/MainPage">Go To Main Page</Button>
                </Card>
              </Grid2>
            </Grid2>
          </div>
        )}
        {!isLoading && !loadedUsers && (
          <div className="Container">
            <h1>No Tanks Found!</h1>
          </div>
        )}
      </Grid2>
    </React.Fragment>
  );
}

export default UsersDatabase;
