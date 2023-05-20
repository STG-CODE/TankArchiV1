//basic imports
import React, { useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../Shared/Hooks/form-hook";
//util imports
import { VALIDATOR_REQUIRE } from "../../../../Shared/Util/validators";
//component imports
import Card from "../../../../Shared/components/UI-Elements/Card";
import Input from "../../../../Shared/components/Form-Elements/Input";
import Text from "../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../Shared/components/Form-Elements/Button";
import ImageUpload from "../../../../Shared/components/Form-Elements/ImageUpload";
import LoadingSpinner from "../../../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../../../Shared/components/UI-Elements/ErrorModal";

function Details(props) {
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //the admin state
  const [loadedAdmin, setLoadedAdmin] = useState();
  //admin's id from the current user at "props"
  const adminId = props.user.id;

  //initial state of the form
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  //useEffect - sets up the uses into the form with out actually fetching it with HTTP CLIENT HOOK
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("The User ID = " + adminId);
        const responseData = props;
        setLoadedAdmin(responseData.user);
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
            image: {
              value: null,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, setLoadedAdmin]);

  //handles the specific changes that the admin or user has made and attempts to save them
  const detailsUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/User/UpdateDetails/${adminId}`,
        "PATCH",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          country: formState.inputs.country.value,
          age: formState.inputs.age.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + loginContext.token
        }
      );
      props.isUpToDate(false);
    } catch (err) {
      console.log("Problem Detected With Updating User!");
    }
    console.log(formState.inputs);
  };

  //handles the user \ admin update of his profile picture
  const userProfilePicUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("Pic Details = " + formState.inputs.image.value);
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        `http://localhost:5000/MainPage/User/UpdateUserProfilePic/${adminId}`,
        "PATCH",
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      props.isUpToDate(false);
    } catch (err) {
      console.log("Problem Detected With Updating User!");
    }
  };

  return (
    <React.Fragment>
      <div className="Container">
        <ErrorModal error={error} onClick={clearError} />
        <Text element={"h2"} value={"Admin's Details:"} />
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedAdmin && (
          <Card>
            <form onSubmit={userProfilePicUpdateHandler}>
              <Text element={"text"} value={"Your Current Profile Picture:"} />
              <ImageUpload
                id="image"
                onInput={inputHandler}
                errorText="Please provide an image"
                currentPfp={props.user.imagePfp}
              />
              <Button type="submit" disabled={!formState.isValid}>
                Save Changed Profile Picture
              </Button>
            </form>
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
                initialValue={loadedAdmin.firstName}
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
                initialValue={loadedAdmin.lastName}
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
                initialValue={loadedAdmin.age}
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
                initialValue={loadedAdmin.country}
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
          <Button to={"/MainPage/Admin/ChangeEmail"}>
            Change Admin Email Address
          </Button>
          <Text element={"text"} value={`To Change Password :`} />
          <Button to={"/MainPage/Admin/ChangePassword"}>
            Change Admin Password
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Details;
