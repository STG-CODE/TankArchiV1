import React from "react";

//
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
//
import TankFestBody from "./components/TankFestBody";

//Component Contents :

//TODO :

function TankFest() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="TankFest Tab!:" />
        <Button to="/MainPage">Go Back</Button>
        <Card>
          <Text element="h3" value="Our Calibrators At TankFest!" />
          <TankFestBody />
        </Card>
      </div>
      <div>
        <Button to="/MainPage">Go Back</Button>
        <Button to="/MainPage">Go To TankFest Site</Button>
      </div>
    </React.Fragment>
  );
}

export default TankFest;
