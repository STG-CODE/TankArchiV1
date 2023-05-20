//basic imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//component imports
import SignUpBody from "./components/SignUpBody";
import Text from "../Shared/components/Visual-Elements/Text";
//page imports
import App from "../../App";
import MainPage from "../MainPage";

function SignUpPage() {
  //// used for getting the "formState" from body and sending
  //// the ".isValid" to the "footer" component for creating an account.
  return (
    <Router>
      <Switch>
        <div className="Container">
          {/* Routes to sign up page and renders it */}
          <Route path="/SignUpPage" exact>
            <Text element="h1" value="Sign Up Page:"/>
            <SignUpBody/>
          </Route>

          {/* routes to start page */}
          <Route path="/WelcomePage" exact>
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
