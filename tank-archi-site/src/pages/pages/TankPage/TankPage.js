import React from "react";

import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
//
import TankPhotosContainer from "./components/TankPhotosContainer";
import TankHistory from "./components/TankHistory";
import TankProduction from "./components/TankProduction";
import TankService from "./components/TankService";
import TankArmsAndArmour from "./components/TankArmsAndArmour";
import RecommendationWindow from "./components/RecommendationWindow";
import Avatar from "../../Shared/components/UI-Elements/Avatar";


//Component Contents :

//TODO :

function TankPage() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Hello Tank Page!:" />
        <Card>
          <Text element="h3" value="Tank Name :" />
          <Avatar></Avatar>
          <Card>
            <Button to="/MainPage">Go Back</Button>
            <Button to="/MainPage">Submit A Suggestion Here</Button>
            <Button>Like +1</Button>
          </Card>
          <Card>
            <Text element="text" value="Tank's Photo Gallery"></Text>
            <TankPhotosContainer />
          </Card>
          <Card>
            <TankHistory />
            <TankProduction />
            <TankService />
            <TankArmsAndArmour />
          </Card>
          <Card>
            <RecommendationWindow />
          </Card>
          <Button to="/MainPage">Go Back</Button>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default TankPage;
