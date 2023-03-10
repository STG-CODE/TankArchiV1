import React from "react";

import Card from "../../../Shared/components/UI-Elements/Card";
import Text from "../../../Shared/components/Visual-Elements/Text";

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
          value={`${
            props.user.lastAccountChanges || "There Were No Changes Made Yet"
          }`}
        />
        <Text
          element={"text"}
          label="Current Date & Time: "
          value={`${new Date()}`}
        />
      </Card>
      {!props.user.isAdmin && (
        <Card>
          <Text
            element={"text"}
            label="Favorite Nation: "
            value={props.user.favNation || "None At The Moment"}
          />
          <Text
            element={"text"}
            label="Favorite Tanks Count: "
            value={props.user.favTanksList.length || "None At The Moment"}
          />
          <Text
            element={"text"}
            label="Favorite Tanks Count: "
            value={props.user.ratedTanks || "None At The Moment"}
          />
          <Text
            element={"text"}
            label="Submitted Suggestions Count: "
            value={props.user.submittedSuggestions.length}
          />
        </Card>
      )}
    </div>
  );
}

export default DetailsBar;
