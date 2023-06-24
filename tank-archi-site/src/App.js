//basic imports
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
//CSS import
import "./App.css";
//component imports
import Welcome from "./components/Welcome";
import SignUp from "./components/Sign-Up";
import Login from "./components/Login";
import Title from "./pages/Shared/components/UI-Elements/Title";
//route imports
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage";
//context import
import { LoginContext } from "./pages/Shared/Context/login-context";
//hook import
import { useAuth } from "./pages/Shared/Hooks/auth-hook";
//Material UI imports
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function App() {
  //deconstruct our hook to all different states and data that the site needs
  const {
    token,
    login,
    logout,
    currentUser,
    isAdmin,
    tankNamesArray,
    tankNationsArray,
    tankAllNationsArray,
    tankCombatRolesArray,
    tankErasArray,
    tankServiceStatesArray,
    tankGenerationsArray, 
    refreshUser
  } = useAuth();
  
  //the optional routes
  let routes;
  if(token) {
    //if user is recognized and is logged in
    console.log("Directing Logged In User!");
    routes=(
      <Switch>
            {/* Routes to the main page after logging in */}
            <Route path="/MainPage" exact>
              <MainPage />
            </Route>
            <Redirect to="/MainPage"/>
      </Switch>
    );
  } else {
    //other wise direct to welcome page
    routes=(
      <Switch>
            {/* Routes to the starting page / login or sign up and welcome */}
            <Route path="/WelcomePage" exact>
              
              <Container maxWidth="md">
                <Grid2 container spacing={2}>
                  <Grid2 xs={12}>
                  <Title/>
                </Grid2>
                <Grid2 xs={12}>
                  <Welcome />
                </Grid2>
                <Grid2 xs={8}>
                  <Login />
                </Grid2>
                <Grid2 xs={4}>
                  <SignUp />
                </Grid2>
                </Grid2>
              </Container>
            </Route>
            {/* Routes to the sign up page */}
            <Route path="/SignUpPage" exact>
              <SignUpPage />
            </Route>

            {/* Redirects to starting page if there is no other url */}
            <Redirect to="/WelcomePage" />
      </Switch>
    );
  }

  return (
    <React.Fragment>
      <LoginContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          currentUser: currentUser,
          isAdmin: isAdmin,
          tankNamesArray: tankNamesArray,
          tankNationsArray: tankNationsArray,
          allNationsArray: tankAllNationsArray,
          tankCombatRolesArray: tankCombatRolesArray,
          tankErasArray: tankErasArray,
          tankServiceStatesArray: tankServiceStatesArray,
          tankGenerationsArray: tankGenerationsArray,
          refreshUser: refreshUser,
          login: login,
          logout: logout
        }}
        >
        <Container maxWidth="xl" fixed disableGutters>
          <Router>
            <div>
              {routes}
            </div>
          </Router>
        </Container>
      </LoginContext.Provider>
    </React.Fragment>
  );
}

export default App;
