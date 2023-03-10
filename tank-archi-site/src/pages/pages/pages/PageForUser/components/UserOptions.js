import React, { useContext } from "react";

import { LoginContext } from "../../../../Shared/Context/login-context";

import Button from "../../../../Shared/components/Form-Elements/Button";
import Card from "../../../../Shared/components/UI-Elements/Card";
import Text from "../../../../Shared/components/Visual-Elements/Text";

function UserOptions() {
  const loginContext = useContext(LoginContext);
  const currentSuggestionCount = loginContext.currentUser.submittedSuggestions.length;
  const isLimit = currentSuggestionCount < 3 ? true : false;
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h2" value="User Options:" />
        <Card>
          <Text
            label={"Submitting Suggestions (" +  currentSuggestionCount + "/3):"}
            value="Do You Wish To Submit A Suggestion For A Tank That You Didn't Find Here?"
          />
          <Text
            label="Description :"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          {!isLimit && (
            <React.Fragment>
              <Button type="submit" disabled={true}>
                Submit a new suggestion
              </Button>
            </React.Fragment>
          )}
          {isLimit && (
            <React.Fragment>
              <Button type="submit" to={"/MainPage/User/SubmitSuggestion"}>
                Submit a new suggestion
              </Button>
            </React.Fragment>
          )}
          
          
          
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserOptions;
