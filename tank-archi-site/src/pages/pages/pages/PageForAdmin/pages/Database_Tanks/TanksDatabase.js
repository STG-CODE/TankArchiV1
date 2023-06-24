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
import Card from "../../../../../Shared/components/UI-Elements/Card";
//context import
import { LoginContext } from "../../../../../Shared/Context/login-context";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TankItem from "./components/components/TankItem";

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
      <Grid2 container spacing={1}>
        <Grid2 xs={12}>
          <Card>
            <Button inverse to="/MainPage/Admin/TanksDatabase/AddTank">
              Create A New Tank
            </Button>
          </Card>
        </Grid2>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTanks && (
        <React.Fragment>
          <Grid2 xs={12}>
              <Card>
                <TableContainer component={Card}>
                  <Table>
                    <TableBody>
                      {loadedTanks.map((tank) => (
                        <TableRow key={tank.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TankItem
                            id={tank.id}
                            tankName={tank.tankName}
                            tankImagePfp={tank.tankImagePfp}
                            nation={tank.nation}
                            combatRole={tank.combatRole}
                            era={tank.era}
                            startDate={tank.servicePeriod.startDate}
                            endDate={tank.servicePeriod.endDate}
                            voteCount={tank.voteCount}
                            avgRating={tank.avgRating}
                            uploadDate={tank.uploadDate}
                            lastUpdated={tank.lastUpdated}
                            onDelete={tankDeletedHandler}
                          />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <Button to="/MainPage/Admin">Go Back</Button>
                <Button to="/MainPage">Head To Main Page</Button>
              </Card>
            </Grid2>
        </React.Fragment>
            
      )}
      {!isLoading && !loadedTanks && (
        <div className="Container">
          <h1>No Tanks Found!</h1>
        </div>
      )}
      </Grid2>
      
    </React.Fragment>
  );
}

export default TanksDatabase;
