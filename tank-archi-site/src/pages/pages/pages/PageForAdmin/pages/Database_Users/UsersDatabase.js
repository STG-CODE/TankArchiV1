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
      <Button inverse to="/MainPage/Admin/UsersDatabase/AddUser">
        Create User
      </Button>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && (
      <div className="Container">
        <div>
          <Text element="h3" value="Users Management Page:" />
          <UsersList
           items={loadedUsers}
           onDeleteUser={userDeletedHandler}
          />
          <div>
            <Button to="/MainPage/Admin">Go Back</Button>
            <Button to="/MainPage">Go To Main Page</Button>
          </div>
          
        </div>
      </div>
      )}
      {!isLoading && !loadedUsers && (
        <div className="Container">
        <h1>No Tanks Found!</h1>
      </div>
      )}
    </React.Fragment>
  );
}

export default UsersDatabase;
