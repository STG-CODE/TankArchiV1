import React from "react";

import ReviewTankBody from "./components/ReviewTankBody";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function ReviewTank() {
    return (
        <div className="Container">
            <Text element="h3" value="Tank Review Page:"/>
            <ReviewTankBody/>
        </div>
    );
}
export default ReviewTank;