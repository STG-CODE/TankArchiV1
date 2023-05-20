//basic imports
import React from "react";
//component imports
import ReviewUserBody from "./components/ReviewUserBody";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function ReviewUser() {
    return (
        <div className="Container">
            <Text element="h3" value="Review User Page:"/>
            <ReviewUserBody/>
        </div>
    );
}
export default ReviewUser;