//basic imports
import React from "react";
import { useHistory } from "react-router-dom";
//util import
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../../Shared/Util/validators";
//hook import
import { useForm } from "../../../../Shared/Hooks/form-hook";
//component imports
import Input from "../../../../Shared/components/Form-Elements/Input";
import Text from "../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../Shared/components/Form-Elements/Button";
import Card from "../../../../Shared/components/UI-Elements/Card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
//Material UI import

function AdminOptions() {
  //form's initial state
  const [formState, inputHandler] = useForm(
    {
      tankId: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  //declare "useHistory" here
  const pages = useHistory();

  //used to pass along the tank id to the next page and uses that to find and add the desired images
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
        <Grid2 container spacing={1}>
          <Grid2>
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
                  validators={[VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH]}
                  errorText="Please Enter A Valid Tank ID!"
                  onInput={inputHandler}
                />
                <br/>
                <Button type="submit" disabled={!formState.isValid}>
                  Click Here To Submit More Photos
                </Button>
              </form>
            </Card>
          </Grid2>
          <Grid2>
            <Card>
              <Text
                label="Tanks Database:"
                element={"text"}
                value={"Main Tanks Database Page"}
              />
              <Button to="/MainPage/Admin/TanksDatabase">Go To Database</Button>
            </Card>
          </Grid2>
          <Grid2>
            <Card>
              <Text
                label="Users Database:"
                element={"text"}
                value={"Main Users Database Page"}
              />
              <Button to="/MainPage/Admin/UsersDatabase">Go To Database</Button>
            </Card>
          </Grid2>
          <Grid2>
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
          </Grid2>
          <Grid2>
            <Card>
              <Text
                label="TankArchi Statistics Page:"
                element={"text"}
                value={"Main Page For Viewing Site Statistics And Such"}
              />
              <Button to="/MainPage/Admin/AdminStatistics">
                Go To Database
              </Button>
            </Card>
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
}

export default AdminOptions;
