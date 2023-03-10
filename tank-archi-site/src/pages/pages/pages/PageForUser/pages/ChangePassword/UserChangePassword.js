import React from "react";

import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../Shared/components/UI-Elements/Card";
//Component Imports :
import UserChangePasswordBody from "./components/UserChangePasswordBody";

function UserChangePassword() {
  return (
    <React.Fragment>
      <div className="container">
        <Text element="h1" value="Changing User's Password:" />
        <Card>
          <Text />
          <UserChangePasswordBody />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserChangePassword;
