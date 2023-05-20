//basic imports
import React, { useContext, useEffect, useState } from "react";
//we use this for using the actual given "userId".
import { useParams, useHistory } from "react-router-dom";
//util imports
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../../../../../Shared/Util/validators";
//hook imports
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
//component imports
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../../../../../../../Shared/components/Form-Elements/ImageUpload";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";

function EditUserBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded user state
  const [loadedUser, setLoadedUser] = useState();
  //extraction of user id from the url
  const userId = useParams().userId;
  //declaration of the "useHistory" variable
  const history = useHistory();

  //initial state of the form
  const [formState, inputHandler, setFormData] = useForm(
    {
      imagePfp: {
        value: null,
        isValid: false,
      },
      username: {
        value: "",
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
      country: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      company: {
        value: "",
        isValid: false,
      },
      publisher: {
        value: "",
        isValid: false,
      },
      association: {
        value: "",
        isValid: false,
      },
      socialType: {
        value: "",
        isValid: false,
      },
      socialName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //useEffect - fetches the user information and fills it into the form for editing
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${userId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            imagePfp: {
              value: responseData.user.imagePfp,
              isValid: true,
            },
            username: {
              value: responseData.user.username,
              isValid: true,
            },
            firstName: {
              value: responseData.user.firstName,
              isValid: true,
            },
            lastName: {
              value: responseData.user.lastName,
              isValid: true,
            },
            country: {
              value: responseData.user.country,
              isValid: true,
            },
            age: {
              value: responseData.user.age,
              isValid: true,
            },
            company: {
              value: responseData.user.company,
              isValid: true,
            },
            publisher: {
              value: responseData.user.publisher,
              isValid: true,
            },
            association: {
              value: responseData.user.association,
              isValid: true,
            },
            socialType: {
              value: responseData.user.socialType,
              isValid: true,
            },
            socialName: {
              value: responseData.user.socialName,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    console.log("Fetching The User");
    fetchUser();
    console.log("Done Fetching The User");
  }, [sendRequest, setLoadedUser]);

  //handles the editing of user information by the admin
  const userUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('imagePfp',formState.inputs.imagePfp.value);
      formData.append('username',formState.inputs.username.value);
      formData.append('firstName',formState.inputs.firstName.value);
      formData.append('lastName',formState.inputs.lastName.value);
      formData.append('country',formState.inputs.country.value);
      formData.append('age',formState.inputs.age.value);
      formData.append('company',formState.inputs.company.value);
      formData.append('publisher',formState.inputs.publisher.value);
      formData.append('association',formState.inputs.association.value);
      formData.append('socialType',formState.inputs.socialType.value);
      formData.append('socialName',formState.inputs.socialName.value);
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${userId}`,
        'PATCH',
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      history.push("/MainPage/Admin/UsersDatabase");
    } catch (err) {
      console.log("Problem Detected With Updating User!");
    }
    console.log(formState.inputs);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClick={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && (
        <div>
          <form onSubmit={userUpdateSubmitHandler}>
            <Text element="text" value="Change User Profile Picture:"/>
            <ImageUpload
              id="imagePfp"
              onInput={inputHandler}
              errorText="Please Pick A Valid Replacement Picture"
              initialValue={loadedUser.imagePfp}
              initialValid={true}
            />
            {/* For "username" */}
            <Input
              id="username"
              element="input"
              type="text"
              label="Username:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Username"
              onInput={inputHandler}
              initialValue={loadedUser.username}
              initialValid={true}
            />
            {/* For "firstName" */}
            <Input
              id="firstName"
              element="input"
              type="text"
              label="First Name:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid First Name"
              onInput={inputHandler}
              initialValue={loadedUser.firstName}
              initialValid={true}
            />
            {/* For "lastName" */}
            <Input
              id="lastName"
              element="input"
              type="text"
              label="Last Name:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Last Name"
              onInput={inputHandler}
              initialValue={loadedUser.lastName}
              initialValid={true}
            />
            {/* For "country" */}
            <Input
              id="country"
              element="input"
              type="text"
              label="Country:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Country"
              onInput={inputHandler}
              initialValue={loadedUser.country}
              initialValid={true}
            />
            {/* For "age" */}
            <Input
              id="age"
              element="input"
              type="text"
              label="Age:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Age"
              onInput={inputHandler}
              initialValue={loadedUser.age}
              initialValid={true}
            />
            {/* For "company" */}
            <Input
              id="company"
              element="input"
              type="text"
              label="Company:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Company"
              onInput={inputHandler}
              initialValue={loadedUser.company || "None"}
              initialValid={true}
            />
            {/* For publisher */}
            <Input
              id="publisher"
              element="input"
              type="text"
              label="Publisher:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Publisher"
              onInput={inputHandler}
              initialValue={loadedUser.publisher || "None"}
              initialValid={true}
            />
            {/* For association */}
            <Input
              id="association"
              element="input"
              type="text"
              label="Association:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Association"
              onInput={inputHandler}
              initialValue={loadedUser.association || "None"}
              initialValid={true}
            />
            {/* For socialType */}
            <Input
              id="socialType"
              element="input"
              type="text"
              label="Social Type:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Social Type"
              onInput={inputHandler}
              initialValue={loadedUser.socialType || "None"}
              initialValid={true}
            />
            {/* For socialName */}
            <Input
              id="socialName"
              element="input"
              type="text"
              label="Social Name:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Social Name"
              onInput={inputHandler}
              initialValue={loadedUser.socialName || "None"}
              initialValid={true}
            />
            <div>
              <Button to="/MainPage/Admin/UsersDatabase">
                Cancel
              </Button>
              <Button type="submit" disabled={!formState.isValid}>
                Update User
              </Button>
              <Button to="/MainPage/Admin/UsersDatabase">
                Delete
              </Button>
              <Button to="/MainPage/Admin/UsersDatabase">
                Review User Information
              </Button>
            </div>
            
          </form>
        </div>
      )}
      {!isLoading && !error && !loadedUser && (
        <div>
          <h2>Could Not Find User!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default EditUserBody;
