//basic imports
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
//util import
import { VALIDATOR_REQUIRE } from "../../../../../../../../Shared/Util/validators";
//hook imports
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
//component imports
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import ImageUpload from "../../../../../../../../Shared/components/Form-Elements/ImageUpload";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";

function EditTankBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTank, setLoadedTank] = useState();
  //extraction of the tank id from the url
  const tankId = useParams().tankId;
  //declaration of the "useHistory" variable
  const history = useHistory();

  //initial state of the form
  const [formState, inputHandler, setFormData] = useForm(
    {
      tankImagePfp: {
        value: null, 
        isValid: false 
      },
      tankName: {
        value: "",
        isValid: false,
      },
      nation: {
        value: "",
        isValid: false,
      },
      userNations:{
        value: "", 
        isValid: false 
      },
      combatRole: {
        value: "",
        isValid: false,
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
      tankServiceStatesInfo: {
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
    },
    false
  );

  //useEffect - fetches for us the tank information and sets it up as the form data
  useEffect(() => {
    const fetchTank = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedTank(responseData.tank);
        setFormData(
          {
            tankImagePfp: {
              value: responseData.tank.tankImagePfp, 
              isValid: true 
            },
            tankName: {
              value: responseData.tank.tankName,
              isValid: true,
            },
            nation: {
              value: responseData.tank.nation,
              isValid: true,
            },
            userNations:{
              value: responseData.tank.userNations,
              isValid: true
            },
            combatRole: {
              value: responseData.tank.combatRole,
              isValid: true
            },
            serviceStates: {
              value: responseData.tank.serviceStates,
              isValid: true
            },
            generation: {
              value: responseData.tank.generation,
              isValid: true
            },
            era: {
              value: responseData.tank.era,
              isValid: true,
            },
            age: {
              value: responseData.tank.age,
              isValid: true,
            },
            startDate: {
              value: responseData.tank.servicePeriod.startDate,
              isValid: true,
            },
            endDate: {
              value: responseData.tank.servicePeriod.endDate,
              isValid: true,
            },
            tankHistory: {
              value: responseData.tank.tankHistory,
              isValid: true,
            },
            tankServiceHistory: {
              value: responseData.tank.tankServiceHistory,
              isValid: true,
            },
            tankServiceStatesInfo:{
              value: responseData.tank.tankServiceStatesInfo,
              isValid: true,
            },
            tankProductionHistory: {
              value: responseData.tank.tankProductionHistory,
              isValid: true,
            },
            tankArmamentAndArmour: {
              value: responseData.tank.tankArmamentAndArmour,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    console.log("Fetching The Tank!");
    fetchTank();
    console.log("Done Fetching The Tank!");
  }, [sendRequest, setLoadedTank]);

  //handles the updating the tank's information when the admin is done making his changes
  const tankUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      let nationsArray; 
      if(typeof(formState.inputs.userNations.value) === "string") {
        nationsArray = formState.inputs.userNations.value.split(",");
      } else {
        nationsArray = formState.inputs.userNations.value;
      }

      let serviceStatesArray;
      if(typeof(formState.inputs.serviceStates.value) === "string") {
        serviceStatesArray = formState.inputs.serviceStates.value.split(",");
      } else {
        serviceStatesArray = formState.inputs.serviceStates.value;
      }
      formData.append('tankImagePfp',formState.inputs.tankImagePfp.value);
      formData.append('tankName',formState.inputs.tankName.value);
      formData.append('nation',formState.inputs.nation.value);
      formData.append('userNations',nationsArray);
      formData.append('combatRole',formState.inputs.combatRole.value);
      formData.append('serviceStates',serviceStatesArray);
      formData.append('generation',formState.inputs.generation.value);
      formData.append('era',formState.inputs.era.value);
      formData.append('age',formState.inputs.age.value);
      formData.append('startDate',formState.inputs.startDate.value);
      formData.append('endDate',formState.inputs.endDate.value);
      formData.append('tankHistory',formState.inputs.tankHistory.value);
      formData.append('tankServiceHistory',formState.inputs.tankServiceHistory.value);
      formData.append('tankServiceStatesInfo',formState.inputs.tankServiceStatesInfo.value);
      formData.append('tankProductionHistory',formState.inputs.tankProductionHistory.value);
      formData.append('tankArmamentAndArmour',formState.inputs.tankArmamentAndArmour.value);
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`,
        'PATCH',
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      history.push("/MainPage/Admin/TanksDatabase");
    } catch (err) {
      console.log("Problem Detected With Updating Tanks!");
      console.log(err);
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
      {!isLoading && loadedTank && (
        <div className="Container">
          <form onSubmit={tankUpdateSubmitHandler}>
            <Text element="text" value="Change Tank Profile Picture:"/>
            <ImageUpload 
              id="tankImagePfp"
              onInput={inputHandler}
              errorText="Please Pick A Valid Replacement Picture"
              initialValue={loadedTank.tankImagePfp}
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
              initialValue={loadedTank.tankName}
              initialValid={true}
            />
            {/* For "nation" */}
            <Input
              id="nation"
              element="input"
              type="text"
              label="Nation:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Nation"
              onInput={inputHandler}
              initialValue={loadedTank.nation}
              initialValid={true}
            />
            {/* For "userNations" */}
            <Input
              id="userNations"
              element="input"
              type="text"
              label="User Nations:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid User Nations"
              onInput={inputHandler}
              initialValue={loadedTank.userNations.join(",")}
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
              initialValue={loadedTank.combatRole}
              initialValid={true}
            />
            {/* For "serviceStates" */}
            <Input
              id="serviceStates"
              element="input"
              type="text"
              label="Service States:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Service States"
              onInput={inputHandler}
              initialValue={loadedTank.serviceStates}
              initialValid={true}
            />
            {/* For "generation" */}
            <Input
              id="generation"
              element="input"
              type="text"
              label="Generation:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Generation"
              onInput={inputHandler}
              initialValue={loadedTank.generation}
              initialValid={true}
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
              initialValue={loadedTank.era}
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
              initialValue={loadedTank.age}
              initialValid={true}
            />
            {/* For "startDate" */}
            <Input
              id="startDate"
              element="input"
              type="text"
              label="Start Date:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Start Date"
              onInput={inputHandler}
              initialValue={loadedTank.servicePeriod.startDate}
              initialValid={true}
            />
            {/* For "endDate" */}
            <Input
              id="endDate"
              element="input"
              type="text"
              label="End Date:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid End Date"
              onInput={inputHandler}
              initialValue={loadedTank.servicePeriod.endDate}
              initialValid={true}
            />
            {/* For "tankHistory" */}
            <Input
              id="tankHistory"
              type="text"
              label="Tank History:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank History"
              onInput={inputHandler}
              initialValue={loadedTank.tankHistory}
              initialValid={true}
            />
            {/* For "tankServiceHistory" */}
            <Input
              id="tankServiceHistory"
              type="text"
              label="Tank Service History:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank Service History"
              onInput={inputHandler}
              initialValue={loadedTank.tankServiceHistory}
              initialValid={true}
            />
            {/* For "tankServiceStatesInfo" */}
            <Input
              id="tankServiceStatesInfo"
              type="text"
              label="Tank Service States Information:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Tank Service States Information"
              onInput={inputHandler}
              initialValue={loadedTank.tankServiceStatesInfo}
              initialValid={true}
            />
            {/* For "tankProductionHistory" */}
            <Input
              id="tankProductionHistory"
              type="text"
              label="Tank Production History:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter Valid Tank Production History"
              onInput={inputHandler}
              initialValue={loadedTank.tankProductionHistory}
              initialValid={true}
            />
            {/* For "tankArmamentAndArmour" */}
            <Input
              id="tankArmamentAndArmour"
              type="text"
              label="Tank Armament And Armour:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter Valid Tank Armament And Armour"
              onInput={inputHandler}
              initialValue={loadedTank.tankArmamentAndArmour}
              initialValid={true}
            />
            <div>
            <Button to="/MainPage/Admin/TanksDatabase">
              Cancel
            </Button>
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE TANK
            </Button>
            <Button to="/MainPage/Admin/TanksDatabase">
              Delete
            </Button>
            <Button to="/MainPage/Admin/TanksDatabase">
              Save Changes And Visit
            </Button>
            </div>
          </form>
        </div>
      )}
      {!isLoading && !error && !loadedTank && (
        <div>
          <h2>Could Not Find Tank!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default EditTankBody;
