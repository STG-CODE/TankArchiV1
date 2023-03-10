import React, { useContext } from "react";
//
import { useHistory } from "react-router-dom";
import { useForm } from "../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../Shared/Hooks/http-hook";
import { LoginContext } from "../../../../../../Shared/Context/login-context";
import { VALIDATOR_REQUIRE } from "../../../../../../Shared/Util/validators";
//
import ErrorModal from "../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Input from "../../../../../../Shared/components/Form-Elements/Input";
import Button from "../../../../../../Shared/components/Form-Elements/Button";
//

function SubmitSuggestionsBody() {
  const loginContext = useContext(LoginContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
    suggestionTitle: { value: "", isValid: false },
    tankName: { value: "", isValid: false },
    nation: { value: "", isValid: false },
    combatRole: { value: "", isValid: false },
    era: { value: "", isValid: false },
    age: { value: "", isValid: false },
    startDate: { value: "", isValid: false },
    endDate: { value: "", isValid: false },
    tankHistory: { value: "", isValid: false },
    tankServiceHistory: { value: "", isValid: false },
    tankProductionHistory: { value: "", isValid: false },
    tankArmamentAndArmour: { value: "", isValid: false },
    userDescription: { value: "", isValid: false }
    },
    false
  );

  const pages = useHistory();

  const suggestionSubmissionHandler = async event => {
    //stops page from reloading
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/MainPage/Admin/SuggestionsDatabase",
        "POST",
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
          creator: loginContext.currentUser.id,
          creatorPfp: loginContext.currentUser.imagePfp,
          creatorName: loginContext.currentUser.username,
          creatorAge: loginContext.currentUser.age,
          creatorEmail: loginContext.currentUser.email,
          userDescription: formState.inputs.userDescription.value
        }),
        { "Content-Type": "application/json" }
      );
      pages.push('/MainPage/User');
      
      console.log(formState.inputs);
    } catch (err) {}

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        <form className="" onSubmit={suggestionSubmissionHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          {/* For "suggestionTitle" */}
          <Input
            id="suggestionTitle"
            element="input"
            type="text"
            label="Suggestion Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Suggestion Title"
            onInput={inputHandler}
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
          />
          {/* For "nation" */}
          <Input
            id="nation"
            element="input"
            type="text"
            label="Nation"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Nation Name"
            onInput={inputHandler}
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
          />
          {/* For "age" */}
          <Input
            id="age"
            element="input"
            type="text"
            label="Age"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Tank Age"
            onInput={inputHandler}
          />
          {/* For "startDate" */}
          <Input
            id="startDate"
            element="input"
            type="text"
            label="Service Period: Start Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Start Date"
            onInput={inputHandler}
          />
          {/* For "endDate" */}
          <Input
            id="endDate"
            element="input"
            type="text"
            label="Service Period: End Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid End Date"
            onInput={inputHandler}
          />
          {/* For "tankHistory" */}
          <Input
            id="tankHistory"
            element="input"
            type="text"
            label="Tank History"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank History"
            onInput={inputHandler}
          />
          {/* For "tankServiceHistory" */}
          <Input
            id="tankServiceHistory"
            element="input"
            type="text"
            label="Tank Service History"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Service History"
            onInput={inputHandler}
          />
          {/* For "tankProductionHistory" */}
          <Input
            id="tankProductionHistory"
            element="input"
            type="text"
            label="Tank Production History"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Production History"
            onInput={inputHandler}
          />
          {/* For "tankArmamentAndArmour" */}
          <Input
            id="tankArmamentAndArmour"
            element="input"
            type="text"
            label="Tank Armament And Armour"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Armament And Armour"
            onInput={inputHandler}
          />
          {/* For userDescription */}
          <Input
            id="userDescription"
            element="input"
            type="text"
            label="User Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid User Description"
            onInput={inputHandler}
          />
          <Button to="/MainPage/User">
          Back To Profile
          </Button>
          <Button type="submit" disabled={!formState.isValid}>
            Submit Suggestion
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SubmitSuggestionsBody;