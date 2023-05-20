//basic imports
import React from "react";
//component imports
import Button from "../pages/Shared/components/Form-Elements/Button";
import Card from "../pages/Shared/components/UI-Elements/Card";
import Text from "../pages/Shared/components/Visual-Elements/Text";

function SignUp() {
  return (
    <div>
      <Card>
        <Text element="h3" value="Sign Up To TankArchi Here!"/>
        <hr/>
        <Text element="text" value="If You Want To Make An Account Then Click Here"/>
        <Button to="/SignUpPage">
          Sign Up
        </Button>
      </Card>
    </div>
  );
}

export default SignUp;