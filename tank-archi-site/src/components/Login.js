import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "../pages/Shared/components/Form-Elements/Button";
import Input from "../pages/Shared/components/Form-Elements/Input";
import { useForm } from "../pages/Shared/Hooks/form-hook";
import { LoginContext } from "../pages/Shared/Context/login-context";
import ErrorModal from "../pages/Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../pages/Shared/components/UI-Elements/LoadingSpinner";
import { useHttpClient } from "../pages/Shared/Hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../pages/Shared/Util/validators";

function Login() {
  const loginContext = useContext(LoginContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(formState.inputs);
      const responseData = await sendRequest(
        "http://localhost:5000/MainPage/User/Login",
        "POST",
        JSON.stringify({
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      responseData.user.lastLoginDate = new Date();
      loginContext.login(responseData.user);
      console.log("Login Was Successful");
      console.log(loginContext);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={loginSubmitHandler}>
          <Input
            element="input"
            id="username"
            type="text"
            label="Username"
            validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid username"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
        <div>
          <h3>Login Here!</h3>
        </div>
        <div>
          <h4>Enter Username</h4>
          <input type="text"></input>
          <br />
          <h4>Enter Password</h4>
          <input type="password"></input>
        </div>
        <br />
        <div>
          <button type="submit">
            <Link to="/MainPage">Login</Link>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
