//basic imports
import React, { useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../Shared/Hooks/http-hook";
//component imports
import TankCatalogueTable from "../Shared/components/Extra-Elements/TankCatalogueTable";
import Button from "../Shared/components/Form-Elements/Button";
import Card from "../Shared/components/UI-Elements/Card";
import Text from "../Shared/components/Visual-Elements/Text";
import LoadingSpinner from "../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../Shared/components/UI-Elements/ErrorModal";
//Material UI imports
import { Container } from "@mui/material";
//CSS import
import "./Catalogue.css";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function Catalogue() {
  //http clint hook destructuring
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  //loaded tank state
  const [loadedTanks,setLoadedTanks] = useState();

  //loaded tank use effect
  useEffect(() => {
    const fetchedTanks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/MainPage/Admin/TanksDatabase/getNineRandomTanks"
        );
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchedTanks();
  },[sendRequest]);

  //the catalogue refresh handler that brings a new list of tanks
  const catalogueRefreshHandler = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/MainPage/Admin/TanksDatabase/getNineRandomTanks"
      );
      setLoadedTanks(responseData.tanks);
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <Card className="catalogueBackground">
        <Grid2 container spacing={1}>
          <Grid2 xs={12}>
            <Text element="h3" value="Welcome To Our Tank Catalogue:"/>
            <hr/>
            <Text element="text" value="Lorem Ipsum, Lorem Ipsum Lorem ipsum dolor sit amet."/>
            <Button onClick={catalogueRefreshHandler}>Refresh</Button>
            <hr/>
          </Grid2>
          <Grid2 xs={12}>
            <Card className="catalogueStyle">
              {isLoading && !loadedTanks && (
                <div>
                  <LoadingSpinner/>
                </div>
              )}
              {!isLoading && !loadedTanks && (
                <div>
                  <Text element="h1" value="No Tanks Found!"/>
                </div>
              )}
              {!isLoading && loadedTanks && (
                <div>
                  <TankCatalogueTable tanks={loadedTanks}/>
                </div>
              )}
            </Card>
          </Grid2>
        </Grid2>
    </Card>
    </React.Fragment>
    
  );
}

export default Catalogue;