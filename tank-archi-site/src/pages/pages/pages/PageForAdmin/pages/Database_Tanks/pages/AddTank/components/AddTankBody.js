//basic imports
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
//hook imports
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
//util import
import { VALIDATOR_REQUIRE } from "../../../../../../../../Shared/Util/validators";
//component imports
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../../../../../../../Shared/components/Form-Elements/ImageUpload";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";

function AddTankBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //initial state of the form
  const [formState, inputHandler] = useForm(
    {
      tankImagePfp: {
        value: null, 
        isValid: false 
      },
      tankName: { 
        value: "", 
        isValid: false 
      },
      nation: {
        value: "", 
        isValid: false 
      },
      userNations:{
        value: "", 
        isValid: false 
      },
      combatRole: { 
        value: "", 
        isValid: false 
      },
      serviceStates: {
        value: "",
        isValid: false
      },
      generation: {
        value: "",
        isValid: false
      },
      era: { 
        value: "", 
        isValid: false 
      },
      age: { 
        value: "", 
        isValid: false 
      },
      startDate: { 
        value: "", 
        isValid: false 
      },
      endDate: { 
        value: "", 
        isValid: false 
      },
      tankHistory: { 
        value: "", 
        isValid: false 
      },
      tankServiceHistory: { 
        value: "", 
        isValid: false 
      },
      tankServiceStatesInfo:{
        value: "", 
        isValid: false 
      },
      tankProductionHistory: { 
        value: "", 
        isValid: false 
      },
      tankArmamentAndArmour: { 
        value: "", 
        isValid: false 
      },
    },
    false
  );
  //"useHistory" is declared as a variable
  const pages = useHistory();

  //handles the process of creating the tank once the admin submitted the needed data
  const tankCreationHandler = async (event) => {
    //stops page from reloading
    event.preventDefault();
    try {
      const formData = new FormData();
      let initialNationsArray = formState.inputs.userNations.value;
      const nationsArray = initialNationsArray.split(",");
      let initialServiceStates = formState.inputs.serviceStates.value;
      const serviceStates = initialServiceStates.split(",");
      formData.append("tankImagePfp",formState.inputs.tankImagePfp.value);
      formData.append("tankName",formState.inputs.tankName.value);
      formData.append("nation",formState.inputs.nation.value);
      formData.append("userNations",nationsArray);
      formData.append("combatRole",formState.inputs.combatRole.value);
      formData.append("serviceStates",serviceStates);
      formData.append("generation",formState.inputs.generation.value);
      formData.append("era",formState.inputs.era.value);
      formData.append("age",formState.inputs.age.value);
      formData.append("startDate",formState.inputs.startDate.value);
      formData.append("endDate",formState.inputs.endDate.value);
      formData.append("tankHistory",formState.inputs.tankHistory.value);
      formData.append("tankServiceHistory",formState.inputs.tankServiceHistory.value);
      formData.append("tankServiceStatesInfo",formState.inputs.tankServiceStatesInfo.value);
      formData.append("tankProductionHistory",formState.inputs.tankProductionHistory.value);
      formData.append("tankArmamentAndArmour",formState.inputs.tankArmamentAndArmour.value);
      console.log(formData.get('tankImagePfp'));
      await sendRequest(
        "http://localhost:5000/MainPage/Admin/TanksDatabase",
        "POST",
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      pages.push("/MainPage/Admin/TanksDatabase");
      console.log(formState.inputs);
    } catch (err) {
      console.log("Problem Detected With Creation Of New Tank!");
    }
  };
  
  //!Create More Validators For Information Relating To Tanks!//
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        <form className="" onSubmit={tankCreationHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Text element="text" value="Pick The Tank's Profile Picture:"/>
        <ImageUpload 
          id="tankImagePfp"
          onInput={inputHandler}
          errorText="Please Pick A Profile Picture For The Created Tank!"
          placeholder="Tank Profile Pic Slot"
        />
        {/* For tankName */}
        <Input
            id="tankName"
            element="input"
            type="text"
            label="Tank Name:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Tank Name"
            onInput={inputHandler}
          />
          {/* For nation */}
        <Input
            id="nation"
            element="input"
            type="text"
            label="Nation Name:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Nation Name"
            onInput={inputHandler}
          />
          {/* For userNations */}
          <Input
            id="userNations"
            element="input"
            type="text"
            label="User Nations:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid User Nations Names"
            onInput={inputHandler}
          />
          {/* For combatRole */}
        <Input
            id="combatRole"
            element="input"
            type="text"
            label="Combat Role:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Combat Role"
            onInput={inputHandler}
          />
            {/* For serviceState */}
        <Input
            id="serviceStates"
            element="input"
            type="text"
            label="Service States:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Service States"
            onInput={inputHandler}
          />
            {/* For generation */}
        <Input
            id="generation"
            element="input"
            type="text"
            label="Generation:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Generation"
            onInput={inputHandler}
          />
          {/* For era */}
        <Input
            id="era"
            element="input"
            type="text"
            label="Tank Era:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Tank Era"
            onInput={inputHandler}
          />
          {/* For age */}
        <Input
            id="age"
            element="input"
            type="text"
            label="Tank's Age:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Age"
            onInput={inputHandler}
          />
          {/* For startDate */}
        <Input
            id="startDate"
            element="input"
            type="text"
            label="Service Period - Start Date:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Year Start Date"
            onInput={inputHandler}
          />
          {/* For endDate */}
        <Input
            id="endDate"
            element="input"
            type="text"
            label="Service Period - End Date:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Year End Date"
            onInput={inputHandler}
          />
          {/* For tankHistory */}
        <Input
            id="tankHistory"
            type="text"
            label="Fill In The Tank's History:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank History"
            onInput={inputHandler}
          />
          {/* For tankServiceHistory */}
        <Input
            id="tankServiceHistory"
            type="text"
            label="Fill In The Tank's Service History:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Service History"
            onInput={inputHandler}
          />
          {/* For tankServiceHistory */}
        <Input
            id="tankServiceStatesInfo"
            type="text"
            label="Fill In The Tank's Service States Information:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Service States Information"
            onInput={inputHandler}
          />
          {/* For tankProductionHistory */}
        <Input
            id="tankProductionHistory"
            type="text"
            label="Fill In The Tank's Production History:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Production History"
            onInput={inputHandler}
          />
          {/* For tankArmamentAndArmour */}
        <Input
            id="tankArmamentAndArmour"
            type="text"
            label="Fill In The Tank's Armament And Armour:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Armament And Armour"
            onInput={inputHandler}
          />
          <div>
            <Button  to="/MainPage/Admin/TanksDatabase">
              Cancel
            </Button>
            <Button type="submit" disabled={!formState.isValid}>
              Create A New Tank
            </Button>
            <Button to="/MainPage/Admin/TanksDatabase">
              Delete
            </Button>
            <Button to="/MainPage/Admin/TanksDatabase">
              Create New Tank And Visit
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
export default AddTankBody;
