//basic imports
import React from "react";
//component imports
import Card from "../pages/Shared/components/UI-Elements/Card";
import Text from "../pages/Shared/components/Visual-Elements/Text";

function Welcome() {
  return (
    <div>
      <Card>
        <Text element="h1" value="Hello And Welcome To TankArchi!"/>
        <br/>
        <Text 
          element="h3" 
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <br/>
      </Card>
      
    </div>
  );
}

export default Welcome;