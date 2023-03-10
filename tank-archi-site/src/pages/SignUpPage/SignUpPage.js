import React, { useState, useContext, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//The components of "SignUpPage"
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

//Routes used in the page
import App from "../../App";
import MainPage from "../MainPage";
//
import { LoginContext } from "../Shared/Context/login-context";

function SignUpPage() {
  //used for getting the "formState" from body and sending
  // the ".isValid" to the "footer" component for creating an account.
  const [stateFromBody, setStateFromBody] = useState(false);

  const bodyCallbackHandler = (bodyState) => {
    setStateFromBody(bodyState);
  };

  return (
    <Router>
      <Switch>
        <div className="Container">
          {/* Routes to sign up page and renders it */}
          <Route path="/SignUpPage" exact>
            <Header />
            <Body/>
            <Footer/>
          </Route>

          {/* routes to start page */}
          <Route path="/" exact>
            <App />
          </Route>

          {/* routes to the main page after user was created */}
          <Route path="/MainPage" exact>
            <MainPage />
          </Route>

          {/*!NOTE: <Redirect to="/" />redirects to the start page */}
        </div>
      </Switch>
    </Router>
  );
}

export default SignUpPage;
