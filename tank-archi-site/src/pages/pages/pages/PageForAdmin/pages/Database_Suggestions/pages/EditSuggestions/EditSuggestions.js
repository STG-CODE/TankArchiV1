//basic import
import React from "react";
//component imports
import EditSuggestionBody from "./components/EditSuggestionBody";
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";

function EditSuggestions() {
    return (
        <div className="Container">
            <Text element="h3" value="Edit Suggestion Page:"/>
            <EditSuggestionBody />
        </div>
    );
}
export default EditSuggestions;