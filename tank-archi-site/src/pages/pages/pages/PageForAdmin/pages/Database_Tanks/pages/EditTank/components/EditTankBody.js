import React, { useState, useEffect } from "react";
//
import { useParams, useHistory } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../../../../../../../../Shared/Util/validators";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../../../../../Shared/Hooks/form-hook";
//
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import Input from "../../../../../../../../Shared/components/Form-Elements/Input";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";



function EditTankBody() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTank, setLoadedTank] = useState();
  const tankId = useParams().tankId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
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
    },
    false
  );

  useEffect(() => {
    const fetchTank = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`
        );
        setLoadedTank(responseData.tank);
        setFormData(
          {
            tankName: {
              value: responseData.tank.tankName,
              isValid: true,
            },
            nation: {
              value: responseData.tank.nation,
              isValid: true,
            },
            combatRole: {
              value: responseData.tank.combatRole,
              isValid: true,
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

  const tankUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`,
        'PATCH',
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
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/MainPage/Admin/TanksDatabase");
    } catch (err) {
      console.log("Problem Detected With Updating Tanks!");
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
            {/* For "tankName" */}
            <Input
              id="tankName"
              element="input"
              type="text"
              label="Tank Name"
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
              label="Nation"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid Nation"
              onInput={inputHandler}
              initialValue={loadedTank.nation}
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
              initialValue={loadedTank.combatRole}
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
              initialValue={loadedTank.era}
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
              initialValue={loadedTank.age}
              initialValid={true}
            />
            {/* For "startDate" */}
            <Input
              id="startDate"
              element="input"
              type="text"
              label="Start Date"
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
              label="End Date"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter A Valid End Date"
              onInput={inputHandler}
              initialValue={loadedTank.servicePeriod.endDate}
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
              initialValue={loadedTank.tankHistory}
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
              initialValue={loadedTank.tankServiceHistory}
              initialValid={true}
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
              initialValue={loadedTank.tankProductionHistory}
              initialValid={true}
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
