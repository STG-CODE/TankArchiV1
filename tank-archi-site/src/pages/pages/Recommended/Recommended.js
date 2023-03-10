import React from "react";

//
import Button from "../../Shared/components/Form-Elements/Button";
import Card from "../../Shared/components/UI-Elements/Card";
import Text from "../../Shared/components/Visual-Elements/Text";

//
import RecommendedBody from "./components/RecommendedBody";

//Component Contents :

//TODO: Think of what to do with this page  moving forward.

function Recommended() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Media & Entertainment Tab!:"/>
        <Card>
          <Text
           label="A Page For All Tank Fans!" 
           element="h3" 
           value="Recommending All Types Of Media Related To Tanks!"
          />
          <RecommendedBody />
        </Card>
      </div>
      <div>
        <Button to="/MainPage">
          Go Back
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Recommended;
