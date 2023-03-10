import React, { useState, useContext } from "react";
import Input from "../../Shared/components/Form-Elements/Input";
import { LoginContext } from "../../Shared/Context/login-context";
import { useForm } from "../../Shared/Hooks/form-hook";
import Button from "../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UI-Elements/LoadingSpinner";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validators";

function Body() {
  const loginContext = useContext(LoginContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error,setError] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      re_password: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/MainPage/User/Signup",
        "POST",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
          age: formState.inputs.age.value,
          password: formState.inputs.password.value,
          re_password: formState.inputs.re_password.value,
          country: formState.inputs.country.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      responseData.user.lastLoginDate = new Date();
      loginContext.login(responseData.user);
      console.log("Sign Up Was Successful");
    } catch (errorMassage) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Sign Up Section:</h2>
        <br />
        <h3>Please Fill Out The Required Details:</h3>
        <br />
        <form onSubmit={signupSubmitHandler}>
          <Input
            element="input"
            id="firstName"
            type="text"
            label="First Name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid first name"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="lastName"
            type="text"
            label="Last Name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid last name"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="username"
            type="text"
            label="Username"
            validators={[
              VALIDATOR_REQUIRE,
              VALIDATOR_MINLENGTH(3),
              VALIDATOR_MAXLENGTH(20),
            ]}
            errorText="Please enter a valid username"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="age"
            type="number"
            label="Age"
            validators={[
              VALIDATOR_REQUIRE,
              VALIDATOR_MIN(13),
              VALIDATOR_MAX(100),
            ]}
            errorText="Please enter a valid first name"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="re_password"
            type="password"
            label="Re-enter password"
            validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(3)]}
            errorText="Password does not match"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="country"
            type="text"
            label="Country"
            validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid country"
            onInput={inputHandler}
          />
          <Button type="button">RETURN TO LOGIN PAGE</Button>
          <Button type="submit" disabled={!formState.isValid}>
            CREATE ACCOUNT
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Body;
