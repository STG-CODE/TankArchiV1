import React from "react";

import Input from "../../../../../../Shared/components/Form-Elements/Input";
import Text from "../../../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../../../Shared/components/Form-Elements/Button";

function UserChangePasswordBody() {
  return (
    <div className="Container">
      <div>
        <div>
            <h3>Enter Your Old Password:</h3>
            <input type="password" placeholder="Old Password"></input>
        </div>
        <div>
            <h3>Enter Your New Password:</h3>
            <input type="password" placeholder="Enter Password"></input>
        </div>
        <div>
            <h3>Re-Enter Your New Password:</h3>
            <input type="password" placeholder="Re-Enter Password"></input>
        </div>
      </div>
      <div className="">
        <Button to="/MainPage/User">
          Cancel
        </Button>
        <Button to="/MainPage/User">
          Save New Password
        </Button>
      </div>
    </div>
  );
}

export default UserChangePasswordBody;