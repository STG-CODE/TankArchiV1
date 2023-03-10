import React from "react";

import Button from "../../../../../../Shared/components/Form-Elements/Button";
import Input from "../../../../../../Shared/components/Form-Elements/Input";
import Text from "../../../../../../Shared/components/Visual-Elements/Text";

function UserChangeEmailBody() {
  return (
    <div className="Container">
      <div>
        <div>
            <h3>Enter Your Old Email:</h3>
            <input type="text" placeholder="Enter Old Email"></input>
        </div>
        <div>
            <h3>Enter Your New Email:</h3>
            <input type="text" placeholder="Enter New Email"></input>
        </div>
        <div>
            <h3>Enter Your Password For Confirmation:</h3>
            <input type="password" placeholder="Enter Password"></input>
        </div>
      </div>
      <div>
        <Button to="/MainPage/User">
          Cancel
        </Button>
        <Button to="/MainPage/User">
          Change Email Address
        </Button>
      </div>
    </div>
  );
}

export default UserChangeEmailBody;