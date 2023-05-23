//basic imports
import React from "react";
//component imports
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../Shared/components/UI-Elements/Card";
import SubmitSuggestionsBody from "./components/SubmitSuggestionsBody";

function SubmitSuggestion() {
  return (
    <React.Fragment>
      <div className="Container">
        <Card>
          <SubmitSuggestionsBody />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default SubmitSuggestion;
