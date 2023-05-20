//basic imports
import React, { useContext, useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
//component imports
import TanksList from "./components/TanksList";
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../../Shared/components/Form-Elements/Button";
//context import
import { LoginContext } from "../../../../../Shared/Context/login-context";

function TanksDatabase() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTanks, setLoadedTanks] = useState();

  //useEffect - fetches for us all of the tanks in the database
  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/MainPage/Admin/TanksDatabase",
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchTanks();
  }, [sendRequest]);

  //handles the visual part of the deletion of a tank from the database
  const tankDeletedHandler = (deletedTankId) => {
    setLoadedTanks(loadedTanks.filter((tank) => tank.id !== deletedTankId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Button inverse to="/MainPage/Admin/TanksDatabase/AddTank">
        Create A New Tank
      </Button>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTanks && (
        <div className="Container">
          <div>
            <Text element="h3" value="Tanks Database Page:" />
            <TanksList items={loadedTanks} onDeleteTank={tankDeletedHandler} />
            <div>
              <Button to="/MainPage/Admin">Go Back</Button>
              <Button to="/MainPage">Head To Main Page</Button>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !loadedTanks && (
        <div className="Container">
          <h1>No Tanks Found!</h1>
        </div>
      )}
    </React.Fragment>
  );
}

export default TanksDatabase;
