import React from "react";

import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../Shared/components/UI-Elements/Card";
//Component Imports :
import SubmitSuggestionsBody from "./components/SubmitSuggestionsBody";

function SubmitSuggestion() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Suggestion Submission Page:" />
        <Card>
          <SubmitSuggestionsBody />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default SubmitSuggestion;
