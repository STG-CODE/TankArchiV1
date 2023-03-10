import React, { useContext, useEffect, useState } from "react";
//we use this("useParams") for using the actual given "userId".
//we use this("useHistory") for directing or redirecting the user to prev pages or others after a function is done.
//
import { useParams, useHistory } from "react-router-dom";
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";
import { VALIDATOR_REQUIRE } from "../../../../../../../../Shared/Util/validators";
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
//
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";



function EditSuggestionBody() {
  const loginContext = useContext(LoginContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSuggestion, setLoadedSuggestion] = useState();
  const suggestionId = useParams().suggestionId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
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

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/EditSuggestion/${suggestionId}`
        );
        setLoadedSuggestion(responseData.suggestion);
        setFormData(
          {
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

  const suggestionUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/EditSuggestion/${suggestionId}`,
        "PATCH",
        JSON.stringify({
          suggestionTitle: formState.inputs.suggestionTitle.value,
          tankName: formState.inputs.tankName.value,
          nation: formState.inputs.nation.value,
          combatRole: formState.inputs.combatRole.value,
          era: formState.inputs.era.value,
          age: formState.inputs.age.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value,
          tankHistory: formState.inputs.tankHistory.value,
          tankServiceHistory: formState.inputs.tankServiceHistory.value,
          tankProductionHistory: formState.inputs.tankProductionHistory.value,
          tankArmamentAndArmour: formState.inputs.tankArmamentAndArmour.value,
          userDescription: formState.inputs.userDescription.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      //!change to suit both admins and users

      history.push(
        !loginContext.isAdmin
          ? "/MainPage/User"
          : "/MainPage/Admin/SuggestionsDatabase"
      );
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
            {/* For "suggestionTitle" */}
            <Input
              id="suggestionTitle"
              element="input"
              type="text"
              label="Suggestion Title"
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
              label="Tank Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank Name"
              onInput={inputHandler}
              initialValue={loadedSuggestion.tankName}
              initialValid={true}
            />
            {/* For "nation" */}
            <Input
              id="nation"
              element="input"
              type="text"
              label="Nation"
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
              label="Combat Role"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Combat Role"
              onInput={inputHandler}
              initialValue={loadedSuggestion.combatRole}
              initialValid={true}
            />
            {/* For "era" */}
            <Input
              id="era"
              element="input"
              type="text"
              label="Era"
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
              label="Age"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Age"
              onInput={inputHandler}
              initialValue={loadedSuggestion.age}
              initialValid={true}
            />
            {/* For "startDate" */}
            <Input
              id="startDate"
              element="input"
              type="text"
              label="Service Period : Start Date"
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
              label="Service Period : End Date"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid End Date"
              onInput={inputHandler}
              initialValue={loadedSuggestion.servicePeriod.endDate}
              initialValid={true}
            />
            {/* For "tankHistory" */}
            <Input
              id="tankHistory"
              element="input"
              type="text"
              label="Tank History"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank History"
              onInput={inputHandler}
              initialValue={loadedSuggestion.tankHistory}
              initialValid={true}
            />
            {/* For "tankServiceHistory" */}
            <Input
              id="tankServiceHistory"
              element="input"
              type="text"
              label="Tank Service History"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank Service History"
              onInput={inputHandler}
              initialValue={loadedSuggestion.tankServiceHistory}
              initialValid={true}
            />
            {/* For "tankProductionHistory" */}
            <Input
              id="tankProductionHistory"
              element="input"
              type="text"
              label="Tank Production History"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank Production History"
              onInput={inputHandler}
              initialValue={loadedSuggestion.tankProductionHistory}
              initialValid={true}
            />
            {/* For "tankArmamentAndArmour" */}
            <Input
              id="tankArmamentAndArmour"
              element="input"
              type="text"
              label="Tank Armament And Armour"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank Armament And Armour"
              onInput={inputHandler}
              initialValue={loadedSuggestion.tankArmamentAndArmour}
              initialValid={true}
            />
            {/* For "userDescription" */}
            <Input
              id="userDescription"
              element="input"
              type="text"
              label="User Description"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid User Description"
              onInput={inputHandler}
              initialValue={loadedSuggestion.userDescription}
              initialValid={true}
            />

            {loginContext.isAdmin && (
              <div>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Cancel</Button>
                <Button type="submit" disabled={!formState.isValid}>UPDATE SUGGESTION</Button>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Delete Suggestion</Button>
                <Button to="/MainPage">Direct Upload</Button>
                <Button to="/MainPage">Direct Upload And Visit</Button>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Direct Upload And Go Back</Button>
              </div>
            )}
            {!loginContext.isAdmin && (
              <div>
                <Button to="/MainPage/User">Cancel</Button>
                <Button type="submit" disabled={!formState.isValid}>UPDATE SUGGESTION</Button>
              </div>
            )}
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
