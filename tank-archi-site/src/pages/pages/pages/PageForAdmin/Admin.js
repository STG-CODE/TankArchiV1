import React, { useContext, useEffect, useState } from "react";
//
import AdminDetailsBar from "../shared/DetailsBar";
import AdminDetails from "../shared/Details";
import AdminOptionalDetails from "../shared/OptionalDetails";
import AdminOptions from "./components/AdminOptions";
//
import { LoginContext } from "../../../Shared/Context/login-context";
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
//
import Button from "../../../Shared/components/Form-Elements/Button";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Card from "../../../Shared/components/UI-Elements/Card";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";

//TODO : implement the optional details part due to lack of it in concept page!

function Admin() {
  const loginContext = new useContext(LoginContext);
  const [loadedAdmin, setLoadedAdmin] = useState();
  const [upToDateAdmin, setUpToDateAdmin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const adminId = loginContext.currentUser.id;

  useEffect(() => {
    const adminInfoChangeHandler = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${adminId}`
        );
        setUpToDateAdmin(true);
        setLoadedAdmin(responseData.user);
        loginContext.refreshUser(responseData.user);
        console.log("Updated Admin Information");
      } catch (err) {}
    };
    adminInfoChangeHandler();
  }, [sendRequest, setLoadedAdmin, upToDateAdmin]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedAdmin && (
        <div className="Container">
          <Text
            element="h1"
            value={"Hello " + loginContext.currentUser.username + "!"}
          />
          <div>
            <Card>
              <AdminDetailsBar user={loginContext.currentUser} />
            </Card>
            <Card>
              {/* <Details isUpToDate={setUpToDateAdmin} user={loginContext.currentUser} /> */}
              <AdminDetails isUpToDate={setUpToDateAdmin} user={loginContext.currentUser} />
            </Card>
            <Card>
              <AdminOptionalDetails isUpToDate={setUpToDateAdmin} user={loginContext.currentUser} />
            </Card>
            <Card>
              <AdminOptions />
            </Card>
            <div>
              <Button to="/MainPage">Go Back</Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Admin;
