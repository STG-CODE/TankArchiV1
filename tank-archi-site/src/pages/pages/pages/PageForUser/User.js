import React, { useContext, useEffect, useState } from "react";
//
import UserDetailsBar from "../shared/DetailsBar";
import UserDetails from "../shared/Details";
import UserOptionalDetails from "../shared/OptionalDetails";
import UserSuggestionsTable from "./components/UserSuggestionTable";
import UserOptions from "./components/UserOptions";
//
import { LoginContext } from "../../../Shared/Context/login-context";
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
//
import Button from "../../../Shared/components/Form-Elements/Button";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Card from "../../../Shared/components/UI-Elements/Card";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";

function User() {
  const loginContext = useContext(LoginContext);
  const [loadedUser, setLoadedUser] = useState();
  const [upToDateUser, setUpToDateUser] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = loginContext.currentUser.id;


  useEffect(() => {
    const userInfoChangeHandler = async() => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${userId}`
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
          <Text
            element="h1"
            value={"Hello " + loginContext.currentUser.username + "!"}
          />
          <div>
            <Card>
              <UserDetailsBar user={loginContext.currentUser} />
            </Card>
            <Card>
              <UserDetails isUpToDate={setUpToDateUser} user={loginContext.currentUser} />
            </Card>
            <Card>
              <UserOptionalDetails isUpToDate={setUpToDateUser} user={loginContext.currentUser} />
            </Card>
            <Card>
              <UserSuggestionsTable isUpToDate={setUpToDateUser}/>
            </Card>
            <Card>
              <UserOptions />
            </Card>
            <div>
              <Button to={"/MainPage"}>Go Back</Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default User;
