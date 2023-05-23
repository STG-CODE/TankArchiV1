//basic imports
import React, { useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
//Material UI imports
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";
//component import
import Card from "../../../Shared/components/UI-Elements/Card";
import Text from "../../../Shared/components/Visual-Elements/Text";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
import TankCatalogueTable from "../../../Shared/components/Extra-Elements/TankCatalogueTable";

function RecommendationWindow(props) {
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTanks, setLoadedTanks] = useState();

  //useEffect - fetches three random tanks as options in the tank's page
  useEffect(() => {
    const fetchRandomTanks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/GetThreeRandomTanks/${props.currentTank}`
        );
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchRandomTanks();
  }, [sendRequest]);

  return (
    <div>
      <Text
        element="h3"
        value="Similar Tanks From The Same Nation That You Might Like"
      />
      <Container fixed>
        <ErrorModal error={error} onClear={clearError} to="/MainPage"/>
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedTanks && (
          <React.Fragment>
              <Grid2 container xs={12} >
                <TankCatalogueTable tanks={loadedTanks}/>
              </Grid2>
          </React.Fragment>
        )}
        {!isLoading && !loadedTanks && (
          <div>
            <h1>Could Not Fetch Three Random Tanks!</h1>
          </div>
        )}
      </Container>
    </div>
  );
}

export default RecommendationWindow;
