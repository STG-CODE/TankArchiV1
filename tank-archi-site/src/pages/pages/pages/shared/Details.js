import React, { useEffect, useState } from "react";
//
import ImageUpload from "../shared/components/ImageUploadSection";
//
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../Shared/Util/validators";
import { useForm } from "../../../Shared/Hooks/form-hook";
//
import Card from "../../../Shared/components/UI-Elements/Card";
import Input from "../../../Shared/components/Form-Elements/Input";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Button from "../../../Shared/components/Form-Elements/Button";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";



function Details(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = props.user.id;

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      age: {
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

  useEffect(() => {
    const fetchUser = () => {
      try {
        console.log("The User ID = " + userId);
        const responseData = props;
        setLoadedUser(responseData.user);
        setFormData(
          {
            firstName: {
              value: responseData.user.firstName,
              isValid: true,
            },
            lastName: {
              value: responseData.user.lastName,
              isValid: true,
            },
            age: {
              value: responseData.user.age,
              isValid: true,
            },
            country: {
              value: responseData.user.country,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, setLoadedUser]);

  const detailsUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/User/UpdateDetails/${userId}`,
        "PATCH",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          country: formState.inputs.country.value,
          age: formState.inputs.age.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.isUpToDate(false);
    } catch (err) {
      console.log("Problem Detected With Updating User!");
    }
    console.log(formState.inputs);
  };

  return (
    <React.Fragment>
      <div className="Container">
        <ErrorModal error={error} onClick={clearError} />
        <Text element={"h2"} value={"User's Details:"} />
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedUser && (
          <Card>
            <ImageUpload user={props.user} isUpToDate={props.isUpToDate} />
            <form onSubmit={detailsUpdateHandler}>
              {/* For "firstName" */}
              <Text
                element={"text"}
                value={`First Name : ${props.user.firstName}`}
              />
              <Input
                id="firstName"
                element="input"
                type="text"
                label="Enter New First Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid First Name!"
                onInput={inputHandler}
                initialValue={loadedUser.firstName}
                initialValid={true}
              />
              {/* For "lastName" */}
              <Text
                element={"text"}
                value={`Last Name : ${props.user.lastName}`}
              />
              <Input
                id="lastName"
                element="input"
                type="text"
                label="Enter New Last Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Last Name!"
                onInput={inputHandler}
                initialValue={loadedUser.lastName}
                initialValid={true}
              />
              {/* For "age" */}
              <Text element={"text"} value={`Age : ${props.user.age}`} />
              <Input
                id="age"
                element="input"
                type="text"
                label="Enter New Age:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Age!"
                onInput={inputHandler}
                initialValue={loadedUser.age}
                initialValid={true}
              />
              {/* For "country" */}
              <Text
                element={"text"}
                value={`Country : ${props.user.country}`}
              />
              <Input
                id="country"
                element="input"
                type="text"
                label="Enter New Country:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Country!"
                onInput={inputHandler}
                initialValue={loadedUser.country}
                initialValid={true}
              />
              <Button type="submit" disabled={!formState.isValid}>
                Save Changes
              </Button>
            </form>
          </Card>
        )}
        <Card>
          <Text
            element={"text"}
            value={`Email Address : ${props.user.email}`}
          />
          <Button to={"/MainPage/User/ChangeEmail"}>
            Change Email Address
          </Button>
          <Text element={"text"} value={`To Change Password :`} />
          <Button to={"/MainPage/User/ChangePassword"}>Change Password</Button>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Details;