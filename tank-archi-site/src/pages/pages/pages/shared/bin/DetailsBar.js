import React from "react";

import Card from "../../../../Shared/components/UI-Elements/Card";
import Text from "../../../../Shared/components/Visual-Elements/Text";
//TODO:create \ add the missing parameters in the data base!(Last Login Date, Favoured Tanks Count, Pfp )

function DetailsBar(props) {
  return (
    <div className="Container">
      <Card>
        <Text
          element={"text"}
          label="Account Creation Date : "
          value={`${props.user.creationDate}`}
        />
        <Text
          element={"text"}
          label="Last Login Date : "
          value={`${props.user.lastLoginDate || "First Time Logging In"}`}
        />
        <Text
          element={"text"}
          label="Last Account Changes : "
          value={`${props.user.lastAccountChanges || "There Were No Changes Made Yet"}`}
        />
        <Text
         element={"text"} 
         label="Current Date & Time: " 
         value={`${new Date()}`}
        />
        
      </Card>
    </div>
  );
}

export default DetailsBar;