//basic imports
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
//hook imports
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
//util imports
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../../../../../Shared/Util/validators";
//(Note) we import the "useCallBack" hook in order the avoid infinite loops
// while using our input handlers, and to avoid recreating
// objects when rerendering components and such.

//(Note) we import the "useReducer" here in order to help us manage all the different states that we have in our component

//here we import our custom "Input" tag
//component imports
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../../../../../../../Shared/components/Form-Elements/ImageUpload";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";

function AddUserBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //initial state of the form
  const [formState, inputHandler] = useForm(
    {
      imagePfp: {
        value: null,
        isValid: false,
      },
      username: {
        value: "", 
        isValid: false 
      },
      email: {
        value: "", 
        isValid: false 
      },
      age: { 
        value: "", 
        isValid: false 
      },
      country: { 
        value: "", 
        isValid: false 
      },
      firstName: { 
        value: "", 
        isValid: false 
      },
      lastName: { 
        value: "", 
        isValid: false 
      },
      password: { 
        value: "", 
        isValid: false 
      },
    },
    false
  );
  
  //declaration of the "useHistory" variable
  const pages = useHistory();

  //handles the creation of a user after the admin filled out all the needed data
  const userCreationHandler = async event => {
    //stops page from reloading
    event.preventDefault();

    try {
      const formData = new FormData();
      console.log("Username = " + formState.inputs.username.value)
      formData.append("imagePfp",formState.inputs.imagePfp.value);
      formData.append("username",formState.inputs.username.value);
      formData.append("email",formState.inputs.email.value);
      formData.append("password",formState.inputs.password.value);
      formData.append("firstName",formState.inputs.firstName.value);
      formData.append("lastName",formState.inputs.lastName.value);
      formData.append("country",formState.inputs.country.value);
      formData.append("age",formState.inputs.age.value);
      await sendRequest(
        "http://localhost:5000/MainPage/Admin/UsersDatabase",
        "POST",
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      pages.push('/MainPage/Admin/UsersDatabase');
      console.log(formState.inputs);
    } catch (err) {
      console.log("Problem Detected With Creation Of New User!");
      console.log(err);
    }

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        <form className="" onSubmit={userCreationHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Text element="text" value="Pick A Profile Picture For New User:"/>
          <ImageUpload 
            id="imagePfp"
            onInput={inputHandler}
            errorText="Please Pick A Profile Picture For The New User"
            placeholder="User Profile Pic Slot"
          />
          {/* For Username */}
          <Input
            id="username"
            element="input"
            type="text"
            label="Username:"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            errorText="Please Enter A Valid Username"
            onInput={inputHandler}
          />
          {/* For Email */}
          <Input
            id="email"
            element="input"
            type="text"
            label="Email:"
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
            label="Age:"
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
            label="Country:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Country Name"
            onInput={inputHandler}
          />
          {/* For First Name */}
          <Input
            id="firstName"
            element="input"
            type="text"
            label="First Name:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid First Name"
            onInput={inputHandler}
          />
          {/* For Last Name */}
          <Input
            id="lastName"
            element="input"
            type="text"
            label="Last Name:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Last Name"
            onInput={inputHandler}
          />
          {/* For Password */}
          <Input
            id="password"
            element="input"
            type="password"
            label="Password:"
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
