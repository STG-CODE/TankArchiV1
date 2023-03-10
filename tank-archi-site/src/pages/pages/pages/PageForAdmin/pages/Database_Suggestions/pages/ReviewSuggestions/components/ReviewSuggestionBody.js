import React, { useState, useEffect, useContext } from "react";
//
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import { useParams, useHistory } from "react-router-dom";
//
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import Avatar from "../../../../../../../../Shared/components/UI-Elements/Avatar";
import Card from "../../../../../../../../Shared/components/UI-Elements/Card";
//

function ReviewSuggestionBody() {
  const loginContext = useContext(LoginContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSuggestion, setLoadedSuggestion] = useState();
  const suggestionId = useParams().suggestionId;
  const history = useHistory();

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/EditSuggestion/${suggestionId}`
        );
        setLoadedSuggestion(responseData.suggestion);
      } catch (err) {}
    };
    console.log("Fetching The Suggestion!");
    fetchSuggestion();
    console.log("Done Fetching The Suggestion!");
  }, [sendRequest, setLoadedSuggestion]);

  //!create buttons for the possible options that the admin has!//

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSuggestion && (
        <div className="Container">
          <Card>
            <Text
              label="Suggestion Submission Date:"
              value={loadedSuggestion.submissionDate}
            />
            <Text
              label="Submission Last Updated:"
              value={
                loadedSuggestion.lastUpdatedDate || "- Was Not Updated Yet -"
              }
            />
            <Card>
              <Avatar
                image={loadedSuggestion.creatorPfp}
                alt="- Missing Creator Pfp -"
                style={{ width: "100px", hight: "50px" }}
              />
            </Card>
            <Card>
              <Text
                label="Creator Name:"
                element="text"
                value={loadedSuggestion.creatorName}
              />
              <Text
                label="Creator Age:"
                element="text"
                value={loadedSuggestion.creatorAge}
              />
              <Text
                label="Creator Email:"
                element="text"
                value={loadedSuggestion.creatorEmail}
              />
              <Text
                label="Creator Description:"
                element="textarea"
                value={loadedSuggestion.userDescription}
              />
              <Text
                label="Suggestion's Title:"
                element="text"
                value={loadedSuggestion.suggestionTitle}
              />
              <Text
                label="Tank's Name:"
                element="text"
                value={loadedSuggestion.tankName}
              />
              <Text
                label="Nation:"
                element="text"
                value={loadedSuggestion.nation}
              />
              <Text
                label="Combat Role:"
                element="text"
                value={loadedSuggestion.combatRole}
              />
              <Text
                label="Related Era"
                element="text"
                value={loadedSuggestion.era}
              />
              <Text
                label="Tank's Age:"
                element="text"
                value={loadedSuggestion.age}
              />
              <Text
                label="Start Of Service Year:"
                element="text"
                value={loadedSuggestion.servicePeriod.startDate}
              />
              <Text
                label="End Of Service Year:"
                element="text"
                value={loadedSuggestion.servicePeriod.endDate}
              />
              <Text
                label="Tank's History In General:"
                element="textarea"
                value={loadedSuggestion.tankHistory}
              />
              <Text
                label="Tank's Service History:"
                element="textarea"
                value={loadedSuggestion.tankServiceHistory}
              />
              <Text
                label="Tank's Production History:"
                element="textarea"
                value={loadedSuggestion.tankProductionHistory}
              />
              <Text
                label="Tank's Armament And Armour:"
                element="textarea"
                value={loadedSuggestion.tankArmamentAndArmour}
              />
            </Card>
          </Card>
          <div>
            {loginContext.isAdmin && (
              <div>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Cancel</Button>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Edit Suggestion</Button>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Delete Suggestion</Button>
                <Button to="/MainPage">Direct Upload</Button>
                <Button to="/MainPage">Direct Upload And Visit</Button>
                <Button to="/MainPage/Admin/SuggestionsDatabase">Direct Upload And Go Back</Button>
              </div>
            )}
            {!loginContext.isAdmin && (
              <div>
                <Button to="/MainPage/User">Go Back</Button>
              </div>
            )}
          </div>
        </div>
      )}
      {!isLoading && !error && !loadedSuggestion && (
        <div>
          <h2>Could Not Find Suggestion Details For Review!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default ReviewSuggestionBody;
