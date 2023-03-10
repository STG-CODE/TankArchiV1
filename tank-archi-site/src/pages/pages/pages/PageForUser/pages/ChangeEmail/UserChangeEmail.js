import React from "react";

import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../Shared/components/UI-Elements/Card";
//Component Imports :
import UserChangeEmailBody from "./components/UserChangeEmailBody";

function UserChangeEmail() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Email Address Change Page:" />
        <Card>
          <UserChangeEmailBody />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserChangeEmail;
