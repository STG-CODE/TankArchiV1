//basic imports
import React, { useContext } from "react";
//context import
import { LoginContext } from "../../Shared/Context/login-context";
//hook import
import { useForm } from "../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
//util imports
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validators";
//component imports
import Input from "../../Shared/components/Form-Elements/Input";
import Button from "../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../Shared/components/Form-Elements/ImageUpload";

function SignUpBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //form state by default
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
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

  //signup submission handler
  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      const formData = new FormData();
      formData.append('image',formState.inputs.image.value);
      formData.append('firstName',formState.inputs.firstName.value);
      formData.append('lastName',formState.inputs.lastName.value);
      formData.append('username',formState.inputs.username.value);
      formData.append('email',formState.inputs.email.value.toLowerCase());
      formData.append('age',formState.inputs.age.value);
      formData.append('password',formState.inputs.password.value);
      formData.append('re_password',formState.inputs.re_password.value);
      formData.append('country',formState.inputs.country.value);
      const responseData = await sendRequest(
        "http://localhost:5000/MainPage/User/Signup",
        "POST",
        formData
      );
      responseData.user.lastLoginDate = new Date();
      loginContext.login(responseData.user,responseData.token);
      console.log("Sign Up Was Successful");
    } catch (errorMassage) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} to="/WelcomePage"/>
      <div className="Container">
        {isLoading && <LoadingSpinner asOverlay />}
        <Text element="h3" value="Please Fill Out The Required Details:"/>
        <form onSubmit={signupSubmitHandler}>
          <Text element="text" value="Pick A Profile Picture Here:"/>
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please provide a pfp for your profile"
            currentPfp={"uploads/stockImages/stockPfpPicture.jpg"} 
          />
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
          <Button type="button" to="/WelcomePage">RETURN TO LOGIN PAGE</Button>
          <Button type="submit" disabled={!formState.isValid}>
            CREATE ACCOUNT
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SignUpBody;
