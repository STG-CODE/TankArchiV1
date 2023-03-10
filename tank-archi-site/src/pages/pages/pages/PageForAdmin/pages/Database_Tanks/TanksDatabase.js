import React, { useEffect, useState } from "react";
//
import TanksList from "./components/TanksList";
//
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
//
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../../Shared/components/Form-Elements/Button";

function TanksDatabase() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTanks, setLoadedTanks] = useState();

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/MainPage/Admin/TanksDatabase"
        );
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchTanks();
  }, [sendRequest]);

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
