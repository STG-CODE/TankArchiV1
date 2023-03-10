import React from "react";
//
import { useHistory } from "react-router-dom";
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../../../../../Shared/Util/validators";
//
//(Note) we import the "useCallBack" hook in order the avoid infinite loops
// while using our input handlers, and to avoid recreating
// objects when rerendering components and such.

//(Note) we import the "useReducer" here in order to help us manage all the different states that we have in our component

//here we import our custom "Input" tag
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";



function AddUserBody() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      username: { value: "", isValid: false },
      email: { value: "", isValid: false },
      age: { value: "", isValid: false },
      country: { value: "", isValid: false },
      firstName: { value: "", isValid: false },
      lastName: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );
  //is used to define the initial state of the form

  const pages = useHistory();

  const userCreationHandler = async event => {
    //stops page from reloading
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/MainPage/Admin/UsersDatabase",
        "POST",
        JSON.stringify({
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          country: formState.inputs.country.value,
          age: formState.inputs.age.value,
        }),
        { "Content-Type": "application/json" }
      );
      pages.push('/MainPage/Admin/UsersDatabase');
      
      console.log(formState.inputs);
    } catch (err) {}

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        <form className="" onSubmit={userCreationHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          {/* For Username */}
          <Input
            id="username"
            element="input"
            type="text"
            label="Username"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            errorText="Please Enter A Valid Username"
            onInput={inputHandler}
          />
          {/* For Email */}
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_EMAIL(),
              VALIDATOR_MINLENGTH(4),
            ]}
            errorText="Please Enter A Valid Email Address"
            onInput={inputHandler}
          />
          {/* For Age */}
          <Input
            id="age"
            element="input"
            type="number"
            label="Age"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MIN(13),
              VALIDATOR_MAX(100),
            ]}
            errorText="Please Enter A Valid Age Number"
            onInput={inputHandler}
          />
          {/* For Country */}
          <Input
            id="country"
            element="input"
            type="text"
            label="Country"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Country Name"
            onInput={inputHandler}
          />
          {/* For First Name */}
          <Input
            id="firstName"
            element="input"
            type="text"
            label="First Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid First Name"
            onInput={inputHandler}
          />
          {/* For Last Name */}
          <Input
            id="lastName"
            element="input"
            type="text"
            label="Last Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Last Name"
            onInput={inputHandler}
          />
          {/* For Password */}
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(8),
              VALIDATOR_MAXLENGTH(20),
            ]}
            errorText="Please Enter A Valid Password"
            onInput={inputHandler}
          />
          <div>
            <Button to="/MainPage/Admin/UsersDatabase">
              Cancel
            </Button>
            <Button type="submit" disabled={!formState.isValid}>
              Create A New User
            </Button>
            <Button to="/MainPage/Admin/UsersDatabase">
              Create User And Review
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddUserBody;
