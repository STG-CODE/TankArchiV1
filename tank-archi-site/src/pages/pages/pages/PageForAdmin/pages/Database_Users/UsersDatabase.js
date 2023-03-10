import React, { useEffect, useState } from "react";
//
import UsersList from "./components/UsersList";
//
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
//
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Button from "../../../../../Shared/components/Form-Elements/Button";
import Text from "../../../../../Shared/components/Visual-Elements/Text";


function UsersDatabase() {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/MainPage/Admin/UsersDatabase'
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const userDeletedHandler = deletedUserId => {
    setLoadedUsers(
      loadedUsers.filter(user => user.id !== deletedUserId)
    );
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
