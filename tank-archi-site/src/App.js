import React, { useState, useContext ,useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//The components of "SignUpPage"
import Welcome from "./components/Welcome";
import SignUp from "./components/Sign-Up";
import Login from "./components/Login";

//Routes used in the page
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage";

//
import { LoginContext } from "./pages/Shared/Context/login-context";

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [currentUser,setCurrentUser] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);

  const refreshUser = useCallback((user) =>{
    console.log("Refreshing User Information!");
    setCurrentUser(user);
  },[]);

  const login = useCallback((user) => {
    console.log("User logged in!");
    setIsLoggedIn(true);
    setCurrentUser(user);
    setIsAdmin(user.isAdmin);
  },[]);

  const logout = useCallback(() => {
    console.log("User logged out!");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsAdmin(null);
  },[]);

  let routes;
  if(isLoggedIn) {
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
    routes=(
      <Switch>
            {/* Routes to the starting page / login or sign up and welcome */}
            <Route path="/" exact>
              <Welcome />
              <Login />
              <SignUp />
            </Route>

            {/* Routes to the sign up page */}
            <Route path="/SignUpPage" exact>
              <SignUpPage />
            </Route>

            {/* Redirects to starting page if there is no other url */}
            <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <LoginContext.Provider
     value={{
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      isAdmin: isAdmin,
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
