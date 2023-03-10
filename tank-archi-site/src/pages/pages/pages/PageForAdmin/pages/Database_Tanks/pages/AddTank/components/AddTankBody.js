import React from "react";
//
import { useHistory } from "react-router-dom";
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
} from "../../../../../../../../Shared/Util/validators";
//
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";



function AddTankBody() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
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
    },
    false
  );
  //is used to define the initial state of the form

  const pages = useHistory();

  const tankCreationHandler = async (event) => {
    //stops page from reloading
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/MainPage/Admin/TanksDatabase",
        "POST",
        JSON.stringify({
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
        }),
        { "Content-Type": "application/json" }
      );
      pages.push("/MainPage/Admin/TanksDatabase");

      console.log(formState.inputs);
    } catch (err) {}
  };
  //!Create More Validators For Information Relating To Tanks!//
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="Container">
        <form className="" onSubmit={tankCreationHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {/* For tankName */}
        <Input
            id="tankName"
            element="input"
            type="text"
            label="Tank Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Tank Name"
            onInput={inputHandler}
          />
          {/* For nation */}
        <Input
            id="nation"
            element="input"
            type="text"
            label="Nation Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Nation Name"
            onInput={inputHandler}
          />
          {/* For combatRole */}
        <Input
            id="combatRole"
            element="input"
            type="text"
            label="Combat Role"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Combat Role"
            onInput={inputHandler}
          />
          {/* For era */}
        <Input
            id="era"
            element="input"
            type="text"
            label="Tank Era"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Tank Era"
            onInput={inputHandler}
          />
          {/* For age */}
        <Input
            id="age"
            element="input"
            type="text"
            label="Tank's Age"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Age"
            onInput={inputHandler}
          />
          {/* For startDate */}
        <Input
            id="startDate"
            element="input"
            type="text"
            label="Service Period : Start Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Year Start Date"
            onInput={inputHandler}
          />
          {/* For endDate */}
        <Input
            id="endDate"
            element="input"
            type="text"
            label="Service Period : End Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter A Valid Year End Date"
            onInput={inputHandler}
          />
          {/* For tankHistory */}
        <Input
            id="tankHistory"
            element="input"
            type="text"
            label="Fill In The Tank's History"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank History"
            onInput={inputHandler}
          />
          {/* For tankServiceHistory */}
        <Input
            id="tankServiceHistory"
            element="input"
            type="text"
            label="Fill In The Tank's Service History"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Service History"
            onInput={inputHandler}
          />
          {/* For tankProductionHistory */}
        <Input
            id="tankProductionHistory"
            element="input"
            type="text"
            label="Fill In The Tank's Production History"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter Valid Tank Production History"
            onInput={inputHandler}
          />
          {/* For tankArmamentAndArmour */}
        <Input
            id="tankArmamentAndArmour"
            element="input"
            type="text"
            label="Fill In The Tank's Armament And Armour"
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
