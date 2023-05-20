//basic import
import React from "react";
//component imports
import EditTankBody from "./components/EditTankBody";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function EditTank() {
    return (
        <div className="Container">
            <Text element="h3" value="Edit Tank Page:"/>
            <EditTankBody />
        </div>
    );
}
export default EditTank;