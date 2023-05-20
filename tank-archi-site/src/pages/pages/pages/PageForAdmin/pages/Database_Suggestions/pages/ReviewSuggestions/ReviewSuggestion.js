//basic import
import React from "react";
//component import
import ReviewSuggestionBody from "./components/ReviewSuggestionBody";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function ReviewSuggestions() {
    return (
        <div className="Container">
            <Text element="h3" value="Suggestion Review Page:"/>
            <ReviewSuggestionBody/>
        </div>
    );
}
export default ReviewSuggestions;