import React from "react";

import Text from "../../Shared/components/Visual-Elements/Text";
import Button from "../../Shared/components/Form-Elements/Button";
import Card from "../../Shared/components/UI-Elements/Card";
//
import AboutUsBody from "./components/AboutUsBody";

//Component Contents :

//TODO :

function aboutUs() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="About Us Tab!:"></Text>
        <Card>
          <Text element="h3" value="The About Us Page Where We Give Details About Our Selves!"/>
          <AboutUsBody/>
        </Card>
      </div>
    </React.Fragment>
    
  );
}

export default aboutUs;