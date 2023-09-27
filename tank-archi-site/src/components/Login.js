//basic imports
import React, { useContext } from "react";
//component imports
import Button from "../pages/Shared/components/Form-Elements/Button";
import Input from "../pages/Shared/components/Form-Elements/Input";
import Card from "../pages/Shared/components/UI-Elements/Card";
import Text from "../pages/Shared/components/Visual-Elements/Text";
//hook imports
import { useForm } from "../pages/Shared/Hooks/form-hook";
import { useHttpClient } from "../pages/Shared/Hooks/http-hook";
//context import
import { LoginContext } from "../pages/Shared/Context/login-context";
import ErrorModal from "../pages/Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../pages/Shared/components/UI-Elements/LoadingSpinner";
//util imports
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE,} from "../pages/Shared/Util/validators";
//CSS import
import "./WelcomePageCSS.css";

function Login() {
  //login context
  const loginContext = useContext(LoginContext);
  //http hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //form state when page loads
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

  //login submission handler
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(formState.inputs);
      const responseData = await sendRequest(
        "http://localhost:5000/MainPage/User/Login",
        "POST",
        JSON.stringify({
          username: formState.inputs.username.value,
          email: formState.inputs.email.value.toLowerCase(),
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log("Token = " + responseData.token);
      responseData.user.lastLoginDate = new Date();//!does nothing
      loginContext.login(responseData.user,responseData.token);
      console.log("Login Was Successful");
      console.log(loginContext);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} to="/WelcomePage"/>
      <div>
        <Card className="background">
          {isLoading && <LoadingSpinner asOverlay />}
        <Text element="h3" value="Login Required"/>
        <hr />
        <form onSubmit={loginSubmitHandler}>
          <Input
            element="input"
            id="username"
            type="text"
            label="Username:"
            validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid username"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="Email:"
            validators={[VALIDATOR_REQUIRE,VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password:"
            validators={[VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Login;
