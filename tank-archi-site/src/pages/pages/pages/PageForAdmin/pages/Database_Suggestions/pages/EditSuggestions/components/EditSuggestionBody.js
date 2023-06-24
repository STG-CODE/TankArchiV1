//basic imports
import React, { useContext, useEffect, useState } from "react";
//we use this("useParams") for using the actual given "userId".
//we use this("useHistory") for directing or redirecting the user to prev pages or others after a function is done.
import { useParams, useHistory } from "react-router-dom";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";
//util import
import { VALIDATOR_REQUIRE } from "../../../../../../../../Shared/Util/validators";
//hook imports
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../../../../../../../Shared/components/Form-Elements/ImageUpload";
import Avatar from "../../../../../../../../Shared/components/UI-Elements/Avatar";
import Card from "../../../../../../../../Shared/components/UI-Elements/Card";
//Material UI imports
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function EditSuggestionBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded suggestion state
  const [loadedSuggestion, setLoadedSuggestion] = useState();
  //extraction of the suggestion id from the url
  const suggestionId = useParams().suggestionId;
  //implementing "useHistory" into a variable
  const history = useHistory();

  //initial form state
  const [formState, inputHandler, setFormData] = useForm(
    {
      suggestionPfp: {
        value: null, 
        isValid: false 
      },
      suggestionTitle: {
        value: "",
        isValid: false,
      },
      tankName: {
        value: "",
        isValid: false,
      },
      nation: {
        value: "",
        isValid: false,
      },
      combatRole: {
        value: "",
        isValid: false,
      },
      era: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
      tankHistory: {
        value: "",
        isValid: false,
      },
      tankServiceHistory: {
        value: "",
        isValid: false,
      },
      tankProductionHistory: {
        value: "",
        isValid: false,
      },
      tankArmamentAndArmour: {
        value: "",
        isValid: false,
      },
      userDescription: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //useEffect - fetches for the user \ admin the suggestion and fills in the current suggestion information
  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/EditSuggestion/${suggestionId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedSuggestion(responseData.suggestion);
        setFormData(
          {
            suggestionPfp: {
              value: responseData.suggestion.suggestionPfp, 
              isValid: true,
            },
            suggestionTitle: {
              value: responseData.suggestion.suggestionTitle,
              isValid: true,
            },
            tankName: {
              value: responseData.suggestion.tankName,
              isValid: true,
            },
            nation: {
              value: responseData.suggestion.nation,
              isValid: true,
            },
            combatRole: {
              value: responseData.suggestion.combatRole,
              isValid: true,
            },
            era: {
              value: responseData.suggestion.era,
              isValid: true,
            },
            age: {
              value: responseData.suggestion.age,
              isValid: true,
            },
            startDate: {
              value: responseData.suggestion.servicePeriod.startDate,
              isValid: true,
            },
            endDate: {
              value: responseData.suggestion.servicePeriod.endDate,
              isValid: true,
            },
            tankHistory: {
              value: responseData.suggestion.tankHistory,
              isValid: true,
            },
            tankServiceHistory: {
              value: responseData.suggestion.tankServiceHistory,
              isValid: true,
            },
            tankProductionHistory: {
              value: responseData.suggestion.tankProductionHistory,
              isValid: true,
            },
            tankArmamentAndArmour: {
              value: responseData.suggestion.tankArmamentAndArmour,
              isValid: true,
            },
            userDescription: {
              value: responseData.suggestion.userDescription,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    console.log("Fetching The Suggestion");
    fetchSuggestion();
    console.log("Done Fetching The Suggestion");
  }, [sendRequest, setLoadedSuggestion]);

  //handles the update of suggestion information
  const suggestionUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('suggestionPfp',formState.inputs.suggestionPfp.value);
      formData.append('suggestionTitle',formState.inputs.suggestionTitle.value);
      formData.append('tankName',formState.inputs.tankName.value);
      formData.append('nation',formState.inputs.nation.value);
      formData.append('combatRole',formState.inputs.combatRole.value);
      formData.append('era',formState.inputs.era.value);
      formData.append('age',formState.inputs.age.value);
      formData.append('startDate',formState.inputs.startDate.value);
      formData.append('endDate',formState.inputs.endDate.value);
      formData.append('tankHistory',formState.inputs.tankHistory.value);
      formData.append('tankServiceHistory',formState.inputs.tankServiceHistory.value);
      formData.append('tankProductionHistory',formState.inputs.tankProductionHistory.value);
      formData.append('tankArmamentAndArmour',formState.inputs.tankArmamentAndArmour.value);
      formData.append('userDescription',formState.inputs.userDescription.value);
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/EditSuggestion/${suggestionId}`,
        'PATCH',
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      //!change to suit both admins and users
      history.push(!loginContext.isAdmin ? "/MainPage/User" : "/MainPage/Admin/SuggestionsDatabase");
      //?Consider:
      //TODO: implement when can distinguish between admin and user!
      //history.push("/MainPage/User/" + loginContext.suggestionId + "/suggestion");
    } catch (err) {
      console.log("Problem Detected With Updating Suggestion!");
    }
    console.log(formState.inputs);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSuggestion && (
        <div className="Container">
          <form onSubmit={suggestionUpdateSubmitHandler}>
            <Card>
              <Grid2 container spacing={1}>
                <Grid2 xs={4}>
                  <Text element="h2" value="Edit Suggestion Page:"/>
                </Grid2>
                <Grid2 xs={8}>
                  <Avatar
                    image={`http://localhost:5000/${loadedSuggestion.creatorPfp}`}
                    alt="- No Creator Profile Picture Found -"
                    style={{ width: "30%", hight: "25%" }}
                  />
                </Grid2 >
                <Grid2 xs={4}>
                  {/* For "suggestionTitle" */}
                  <Input
                    id="suggestionTitle"
                    element="input"
                    type="text"
                    label="Suggestion Title:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Suggestion Title"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.suggestionTitle}
                    initialValid={true}
                  />
                  {/* For "tankName" */}
                  <Input
                    id="tankName"
                    element="input"
                    type="text"
                    label="Tank Name:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Tank Name"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.tankName}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "nation" */}
                  <Input
                    id="nation"
                    element="input"
                    type="text"
                    label="Nation:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Nation"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.nation}
                    initialValid={true}
                  />
                  {/* For "combatRole" */}
                  <Input
                    id="combatRole"
                    element="input"
                    type="text"
                    label="Combat Role:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Combat Role"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.combatRole}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "era" */}
                  <Input
                    id="era"
                    element="input"
                    type="text"
                    label="Era:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Era"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.era}
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
                    initialValue={loadedSuggestion.age}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "startDate" */}
                  <Input
                    id="startDate"
                    element="input"
                    type="text"
                    label="Service Period - Start Date:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Start Date"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.servicePeriod.startDate}
                    initialValid={true}
                  />
                  {/* For "endDate" */}
                  <Input
                    id="endDate"
                    element="input"
                    type="text"
                    label="Service Period - End Date:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid End Date"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.servicePeriod.endDate}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "tankHistory" */}
                  <Input
                    id="tankHistory"
                    type="text"
                    label="Tank History:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Tank History"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.tankHistory}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "tankServiceHistory" */}
                  <Input
                    id="tankServiceHistory"
                    type="text"
                    label="Tank Service History:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Tank Service History"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.tankServiceHistory}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "tankProductionHistory" */}
                  <Input
                    id="tankProductionHistory"
                    type="text"
                    label="Tank Production History:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Tank Production History"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.tankProductionHistory}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "tankArmamentAndArmour" */}
                  <Input
                    id="tankArmamentAndArmour"
                    type="text"
                    label="Tank Armament And Armour:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Tank Armament And Armour"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.tankArmamentAndArmour}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  {/* For "userDescription" */}
                  <Input
                    id="userDescription"
                    type="text"
                    label="User Description:"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid User Description"
                    onInput={inputHandler}
                    initialValue={loadedSuggestion.userDescription}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Text element="text" value="Change Suggestion Profile Picture:"/>
                  <ImageUpload 
                    id="suggestionPfp"
                    onInput={inputHandler}
                    errorText="Please Pick A Valid Replacement Picture"
                    initialValue={loadedSuggestion.suggestionPfp}
                    initialValid={true}
                  />
                </Grid2>
                <Grid2 xs={12}>
                {loginContext.isAdmin && (
                  <div>
                    <Button to="/MainPage/Admin/SuggestionsDatabase">Cancel</Button>
                    <Button type="submit" disabled={!formState.isValid}>Update Suggestion</Button>
                    <Button to="/MainPage/Admin/SuggestionsDatabase">Delete Suggestion</Button>
                    <Button to="/MainPage">Direct Upload</Button>
                    <Button to="/MainPage">Direct Upload And Visit</Button>
                    <Button to="/MainPage/Admin/SuggestionsDatabase">Direct Upload And Go Back</Button>
                  </div>
                )}
                {!loginContext.isAdmin && (
                  <div>
                    <Button to="/MainPage/User">Cancel</Button>
                    <Button type="submit" disabled={!formState.isValid}>Update Suggestion</Button>
                  </div>
                )}
                </Grid2>
              </Grid2>
            
            </Card>
            
          </form>
        </div>
      )}
      {!isLoading && !error && !loadedSuggestion && (
        <div>
          <h2>Could Not Find Suggestion!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default EditSuggestionBody;
