import React, { useState } from "react";
//
import { Link, useHistory } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../../../../Shared/Util/validators";
import { useForm } from "../../../../Shared/Hooks/form-hook";
//
import Input from "../../../../Shared/components/Form-Elements/Input";
import Text from "../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../Shared/components/Form-Elements/Button";
import Card from "../../../../Shared/components/UI-Elements/Card";

function AdminOptions() {
  // const [tankName, setTankName] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      tankId: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const pages = useHistory();

  const tankIdHandler = (event) => {
    event.preventDefault();
    const tankId = formState.inputs.tankId.value;
    console.log("Our Given Tank ID : " + tankId);
    pages.push(`/MainPage/Admin/AddTankPhotos/${tankId}`);
  };

  return (
    <div className="Container">
      <Text element={"h2"} value={"Admin Functional Options:"} />
      <div>
        <Card>
          <Text
            label="Tanks Database:"
            element={"text"}
            value={"To Upload More Photos For A Specific Tank Click Here"}
          />
          <form onSubmit={tankIdHandler}>
            <Input
              id="tankId"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please Enter A Valid Tank ID!"
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Click Here To Submit More Photos
            </Button>
          </form>
        </Card>
        <Card>
          <Text
            label="Tanks Database:"
            element={"text"}
            value={"Main Tanks Database Page"}
          />
          <Button to="/MainPage/Admin/TanksDatabase">Go To Database</Button>
        </Card>
        <Card>
          <Text
            label="Users Database:"
            element={"text"}
            value={"Main Users Database Page"}
          />
          <Button to="/MainPage/Admin/UsersDatabase">Go To Database</Button>
        </Card>
        <Card>
          <Text
            label="Tank Suggestions Database:"
            element={"text"}
            value={"Main Suggestions Database Page"}
          />
          <Button to="/MainPage/Admin/SuggestionsDatabase">
            Go To Database
          </Button>
        </Card>
        <Card>
          <Text
            label="TankArchi Statistics Page:"
            element={"text"}
            value={"Main Page For Viewing Site Statistics And Such"}
          />
          <Button to="/MainPage/Admin/AdminStatistics">Go To Database</Button>
        </Card>
      </div>
    </div>
  );
}

export default AdminOptions;
