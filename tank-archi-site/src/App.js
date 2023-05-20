//basic imports
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
//component imports
import Welcome from "./components/Welcome";
import SignUp from "./components/Sign-Up";
import Login from "./components/Login";
//route imports
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage";
//context import
import { LoginContext } from "./pages/Shared/Context/login-context";
//hook import
import { useAuth } from "./pages/Shared/Hooks/auth-hook";

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
              <Welcome />
              <Login />
              <SignUp />
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
      <Router>
          <div className="container">
            {routes}
          </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
