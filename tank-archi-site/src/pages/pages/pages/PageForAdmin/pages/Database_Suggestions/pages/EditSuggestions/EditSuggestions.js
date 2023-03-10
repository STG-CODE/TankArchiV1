import React from "react";
//
import EditSuggestionBody from "./components/EditSuggestionBody";
//
import Text from "../../../../../../../Shared/components/Visual-Elements/Text";
//

function EditSuggestions() {
    // const suggestionId = useParams().suggestionId;
    // console.log(suggestionId); suggestionId={suggestionId}
    return (
        <div className="Container">
            <Text element="h3" value="Edit Suggestion Page:"/>
            <EditSuggestionBody />
        </div>
    );
}
export default EditSuggestions;