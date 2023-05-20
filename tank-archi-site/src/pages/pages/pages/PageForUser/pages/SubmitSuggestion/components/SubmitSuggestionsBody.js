//basic imports
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
//hook imports
import { useForm } from "../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../Shared/Hooks/http-hook";
//context import
import { LoginContext } from "../../../../../../Shared/Context/login-context";
//util imports
import { VALIDATOR_REQUIRE } from "../../../../../../Shared/Util/validators";
//component imports
import ErrorModal from "../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Input from "../../../../../../Shared/components/Form-Elements/Input";
import Button from "../../../../../../Shared/components/Form-Elements/Button";
import Text from "../../../../../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../../../../../Shared/components/Form-Elements/ImageUpload";

function SubmitSuggestionsBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //initial state of the form
  const [formState, inputHandler] = useForm(
    {
      suggestionPfp: { value: null, isValid: false },
      suggestionTitle: { value: "", isValid: false },
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
      userDescription: { value: "", isValid: false },
    },
    false
  );

  //"useHistory" variable
  const pages = useHistory();

  //handles the submission of a user's suggestion
  const suggestionSubmissionHandler = async (event) => {
    //stops page from reloading
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("suggestionPfp", formState.inputs.suggestionPfp.value);
      formData.append("suggestionTitle",formState.inputs.suggestionTitle.value);
      formData.append("tankName", formState.inputs.tankName.value);
      formData.append("nation", formState.inputs.nation.value);
      formData.append("combatRole", formState.inputs.combatRole.value);
      formData.append("era", formState.inputs.era.value);
      formData.append("age", formState.inputs.age.value);
      formData.append("startDate", formState.inputs.startDate.value);
      formData.append("endDate", formState.inputs.endDate.value);
      formData.append("tankHistory", formState.inputs.tankHistory.value);
      formData.append("tankServiceHistory",formState.inputs.tankServiceHistory.value);
      formData.append("tankProductionHistory",formState.inputs.tankProductionHistory.value);
      formData.append("tankArmamentAndArmour",formState.inputs.tankArmamentAndArmour.value);
      formData.append("creator", loginContext.currentUser.id);
      formData.append("creatorPfp", loginContext.currentUser.imagePfp);
      formData.append("creatorName", loginContext.currentUser.username);
      formData.append("creatorAge", loginContext.currentUser.age);
      formData.append("creatorEmail", loginContext.currentUser.email);
      formData.append("userDescription",formState.inputs.userDescription.value);
      
      await sendRequest(
        "http://localhost:5000/MainPage/Admin/SuggestionsDatabase",
        "POST",
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      pages.push("/MainPage/User");
      
      console.log(formState.inputs);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        <form className="" onSubmit={suggestionSubmissionHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Text
            element="text"
            value="Pick The Tank Suggestion's Profile Picture:"
          />
          <ImageUpload
            id="suggestionPfp"
            onInput={inputHandler}
            errorText="Please Pick A Profile Picture For The Suggested Tank!"
            placeholder="Tank Suggestion Profile Pic Slot"
          />
          {/* For "suggestionTitle" */}
          <Input
            id="suggestionTitle"
            element="input"
            type="text"
            label="Suggestion Title:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Suggestion Title"
            onInput={inputHandler}
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
          />
          {/* For "nation" */}
          <Input
            id="nation"
            element="input"
            type="text"
            label="Nation:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Nation Name"
            onInput={inputHandler}
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
          />
          {/* For "era" */}
          <Input
            id="era"
            element="input"
            type="text"
            label="Era:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Era"
            onInput={inputHandler}
          />
          {/* For "age" */}
          <Input
            id="age"
            element="input"
            type="text"
            label="Age:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Tank Age"
            onInput={inputHandler}
          />
          {/* For "startDate" */}
          <Input
            id="startDate"
            element="input"
            type="text"
            label="Service Period - Start Date:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Start Date"
            onInput={inputHandler}
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
          />
          {/* For "tankHistory" */}
          <Input
            id="tankHistory"
            type="text"
            label="Tank History:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank History"
            onInput={inputHandler}
          />
          {/* For "tankServiceHistory" */}
          <Input
            id="tankServiceHistory"
            type="text"
            label="Tank Service History:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Service History"
            onInput={inputHandler}
          />
          {/* For "tankProductionHistory" */}
          <Input
            id="tankProductionHistory"
            type="text"
            label="Tank Production History:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Production History"
            onInput={inputHandler}
          />
          {/* For "tankArmamentAndArmour" */}
          <Input
            id="tankArmamentAndArmour"
            type="text"
            label="Tank Armament And Armour:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Armament And Armour"
            onInput={inputHandler}
          />
          {/* For userDescription */}
          <Input
            id="userDescription"
            type="text"
            label="User Description:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid User Description"
            onInput={inputHandler}
          />
          <Button to="/MainPage/User">Back To Profile</Button>
          <Button type="submit" disabled={!formState.isValid}>
            Submit Suggestion
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SubmitSuggestionsBody;
