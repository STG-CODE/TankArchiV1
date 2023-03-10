import React from "react";
import Button from "../../../Shared/components/Form-Elements/Button";
import Card from "../../../Shared/components/UI-Elements/Card";

function AboutUsBody() {
  return (
    <div className="Container">
      <Card>
        <h2> - - - To Be Decided - - - </h2>
      </Card>
      <div>
        <Button to="/MainPage" >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default AboutUsBody;