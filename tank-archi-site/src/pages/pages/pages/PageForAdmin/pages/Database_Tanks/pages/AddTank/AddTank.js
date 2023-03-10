import React from "react";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";
//
import AddTankBody from "./components/AddTankBody";

function AddTank() {
    return (
        <div className="Container">
            <Text element="h3" value="Add Tank Page:"/>
            <AddTankBody/>
        </div>
    );
}
export default AddTank;