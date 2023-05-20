//basic imports
import React from "react";
//component imports
import EditUserBody from "./components/EditUserBody";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function EditUser() {
    return (
        <div className="Container">
            <Text element="h3" value="Edit User Page:"/>
            <EditUserBody/>
        </div>
    );
}
export default EditUser;