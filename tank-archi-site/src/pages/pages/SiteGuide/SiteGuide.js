import React from "react";

//
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
//
import SiteGuideBody from "./components/SiteGuideBody";


//Component Contents :

//TODO :

function SiteGuide() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Site Guide Tab!:" />
        <Card>
          <Text
            element="h3"
            value="The Site Guide To Everything You Need To Know And More!"
          />
          <SiteGuideBody />
        </Card>
      </div>
      <div>
        <Button to="/MainPage" >
          Go Back
        </Button>
      </div>
    </React.Fragment>
  );
}

export default SiteGuide;
