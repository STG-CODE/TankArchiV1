import React from "react";
//
import AddUserBody from "./components/AddUserBody";
//
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function AddUser() {
    return (
        <div className="Container">
            <Text element="h3" value="Add User Page:"/>
            <AddUserBody/>
        </div>
    );
}
export default AddUser;