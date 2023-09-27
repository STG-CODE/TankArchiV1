//basic imports
import React, { useState, useEffect, useContext } from "react";
//hook imports
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
import { useForm } from "../../../Shared/Hooks/form-hook";
//util imports
import { VALIDATOR_REQUIRE } from "../../../Shared/Util/validators";
//component imports
import Card from "../../../Shared/components/UI-Elements/Card";
import Input from "../../../Shared/components/Form-Elements/Input";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Button from "../../../Shared/components/Form-Elements/Button";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
//context import
import { LoginContext } from "../../../Shared/Context/login-context";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function OptionalDetails(props) {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded user state
  const [loadedUser, setLoadedUser] = useState();
  //extracts the user's id from the "props"
  const userId = props.user.id;

  //initial state of the form
  const [formState, inputHandler, setFormData] = useForm(
    {
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
      favNation: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //useEffect - sets up the uses into the form with out actually fetching it with HTTP CLIENT HOOK
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("The User ID = " + userId);
        const responseData = props;
        console.log("The User = " + responseData.user);
        setLoadedUser(responseData.user);
        setFormData(
          {
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
              value: responseData.user.socialGroup.socialType,
              isValid: true,
            },
            socialName: {
              value: responseData.user.socialGroup.socialName,
              isValid: true,
            },
            favNation: {
              value: responseData.user.favNation,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, setLoadedUser]);

  //handles the update of the optional details if there was any
  const optionalDetailsUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/User/UpdateOptionalDetails/${userId}`,
        "PATCH",
        JSON.stringify({
          company: formState.inputs.company.value,
          publisher: formState.inputs.publisher.value,
          association: formState.inputs.association.value,
          socialType: formState.inputs.socialType.value,
          socialName: formState.inputs.socialName.value,
          favNation: formState.inputs.favNation.value,
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

  return (
    <React.Fragment>
      <div className="Container">
        <ErrorModal error={error} onClick={clearError} />
        <Text element={"h2"} value={"User Optional Details:"} />
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedUser && (
          <Card className="none">
            <form onSubmit={optionalDetailsUpdateHandler}>
              <Grid2 container spacing={1}>
                <Grid2>
                  {/* For "company" */}
              <Text
                element={"text"}
                value={`Company Name : ${loadedUser.company || "None"}`}
              />
              <Input
                id="company"
                element="input"
                type="text"
                label="Enter New Company Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Company Name!"
                onInput={inputHandler}
                initialValue={loadedUser.company || "None"}
                initialValid={true}
              />
                </Grid2>
                <Grid2>
                  {/* For "publisher" */}
              <Text
                element={"text"}
                value={`Publisher Name : ${loadedUser.publisher || "None"}`}
              />
              <Input
                id="publisher"
                element="input"
                type="text"
                label="Enter New Publisher Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Publisher Name!"
                onInput={inputHandler}
                initialValue={loadedUser.publisher || "None"}
                initialValid={true}
              />
                </Grid2>
                <Grid2>
                  {/* For "association" */}
              <Text
                element={"text"}
                value={`Association Name : ${loadedUser.association || "None"}`}
              />
              <Input
                id="association"
                element="input"
                type="text"
                label="Enter New Association Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Association Name!"
                onInput={inputHandler}
                initialValue={loadedUser.association || "None"}
                initialValid={true}
              />
                </Grid2>
                <Grid2>
                  {/* For "socialType" */}
              <Text
                element={"text"}
                value={`Social Type Of Group : ${loadedUser.socialGroup.socialType || "None"}`}
              />
              
              <Input
                id="socialType"
                element="input"
                type="text"
                label="Enter New Social Type Of Group :"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Social Group Type!"
                onInput={inputHandler}
                initialValue={loadedUser.socialGroup.socialType || "None"}
                initialValid={true}
              />
                </Grid2>
                <Grid2>
                  {/* For "socialName" */}
              <Text
                element={"text"}
                value={`Social Group Name : ${loadedUser.socialGroup.socialName || "None"}`}
              />
              
              <Input
                id="socialName"
                element="input"
                type="text"
                label="Enter New Social Group Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Social Group Name!"
                onInput={inputHandler}
                initialValue={loadedUser.socialGroup.socialName || "None"}
                initialValid={true}
              />
                </Grid2>
                <Grid2>
                  {/* For "favNation" */}
              <Text
                element={"text"}
                value={`Favorite Nation Name : ${loadedUser.favNation || "None"}`}
              />
              <Input
                id="favNation"
                element="input"
                type="text"
                label="Enter New Favorite Nation Name:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter A Valid Nation Name!"
                onInput={inputHandler}
                initialValue={loadedUser.favNation || "None"}
                initialValid={true}
              />
                </Grid2>
                <Grid2>
                  <Card className="none">
                    <Button type="submit" disabled={!formState.isValid}>
                      Save Changes
                    </Button>
                  </Card>
                </Grid2>
              </Grid2>
            </form>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
}

export default OptionalDetails;
