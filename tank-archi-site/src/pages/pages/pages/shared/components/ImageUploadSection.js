import React, { useEffect, useState } from "react";
//
import { useHttpClient } from "../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../Shared/Hooks/form-hook";
//
import Text from "../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../Shared/components/Form-Elements/Button";
import ImageUpload from "../../../../Shared/components/Form-Elements/ImageUpload";
import LoadingSpinner from "../../../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../../../Shared/components/UI-Elements/ErrorModal";

function PfpUploader(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = props.user.id;

  const [formState, inputHandler, setFormData] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    console.log("User ID = " + userId);
    const fetchUserPfp = async () => {
      try {
        setFormData(
          {
            image: {
              value: null,
              isValid: false,
            },
          },
          false
        );
      } catch (err) {}
    };
    fetchUserPfp();
  },[]);

  const userProfilePicUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("Pic Details = " + formState.inputs.image.value);
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        `http://localhost:5000/MainPage/User/UpdateUserProfilePic/${userId}`,
        "PATCH",
        formData
      );
      props.isUpToDate(false);
    } catch (err) {
      console.log("Problem Detected With Updating User!");
    }
  };

  return (
    <React.Fragment>
        <ErrorModal error={error} onClick={clearError} />
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
    </React.Fragment>
  );
}

export default PfpUploader;
