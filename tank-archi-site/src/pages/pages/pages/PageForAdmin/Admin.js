//basic imports
import React, { useContext, useEffect, useState } from "react";
//component imports
import AdminDetailsBar from "../shared/DetailsBar";
import AdminDetails from "../shared/Details";
import AdminOptionalDetails from "../shared/OptionalDetails";
import AdminOptions from "./components/AdminOptions";
//
import Button from "../../../Shared/components/Form-Elements/Button";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Card from "../../../Shared/components/UI-Elements/Card";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
//context import
import { LoginContext } from "../../../Shared/Context/login-context";
//hook import
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
//TODO : implement the optional details part due to lack of it in concept page!

function Admin() {
  //login context
  const loginContext = new useContext(LoginContext);
  //contains current state of loaded admin
  const [loadedAdmin, setLoadedAdmin] = useState();
  //contains boolean state of "is admin up to date"
  const [upToDateAdmin, setUpToDateAdmin] = useState(true);
  //deconstruction of of the HTTP CLIENT hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //contains admin id
  const adminId = loginContext.currentUser.id;

  //contains mainly the handler for if admin changes his information
  useEffect(() => {
    const adminInfoChangeHandler = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${adminId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
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
          
          <div>
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
                  <AdminDetailsBar user={loginContext.currentUser} />
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <AdminDetails isUpToDate={setUpToDateAdmin} user={loginContext.currentUser} />
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <AdminOptionalDetails isUpToDate={setUpToDateAdmin} user={loginContext.currentUser} />
                </Card>
              </Grid2>
              <Grid2 xs={12}>
                <Card>
                  <AdminOptions />
                </Card>
              </Grid2>
            </Grid2>
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
