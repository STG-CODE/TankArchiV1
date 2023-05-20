//basic imports
import React, { useEffect, useState, useContext } from "react";
//hook import
import { useHttpClient } from "../../../../Shared/Hooks/http-hook";
//context import
import { LoginContext } from "../../../../Shared/Context/login-context";
//component imports
import SuggestionItem from "../../PageForAdmin/pages/Database_Suggestions/components/components/SuggestionItem";
import ErrorModal from "../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../Shared/components/Visual-Elements/Text";

function UserSuggestionsTable(props) {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded suggestion state
  const [loadedSuggestions, setLoadedSuggestions] = useState();
  //current logged in user's id
  const userId = loginContext.currentUser.id;

  //useEffect - fetches the user's suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/${userId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedSuggestions(responseData.suggestions);
      } catch (err) {}
    };
    fetchSuggestions();
  }, [sendRequest],[userId]);

  //handles the deletion refresh in case the user decides to delete his suggestion
  const suggestionDeletedHandler = deletedSuggestionId => {
    props.isUpToDate(false);
    setLoadedSuggestions(
      loadedSuggestions.filter(suggestion => suggestion.id !== deletedSuggestionId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {(!isLoading && loadedSuggestions) && (loadedSuggestions.length > 0) && (
        <div className="Container">
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <button>ID</button>
                  </th>
                  <th>
                    <button>Suggestion Profile Picture</button>
                  </th>
                  <th>
                    <button>Tank Name</button>
                  </th>
                  <th>
                    <button>Tank Age</button>
                  </th>
                  <th>
                    <button>Tank Nation</button>
                  </th>
                  <th>
                    <button>User's Profile Pic</button>
                  </th>
                  <th>
                    <button>Username</button>
                  </th>
                  <th>
                    <button>User Age</button>
                  </th>
                  <th>
                    <button>User Email</button>
                  </th>
                  <th>
                    <button>Submission Date</button>
                  </th>
                  <th>
                    <button>Options</button>
                  </th>
                </tr>
              </thead>
              {loadedSuggestions.map((suggestion) => {
                return (
                  <tbody>
                    <SuggestionItem
                      key={suggestion.id}
                      id={suggestion.id}
                      suggestionPfp={suggestion.suggestionPfp}
                      tankName={suggestion.tankName}
                      age={suggestion.age}
                      nation={suggestion.nation}
                      creatorPfp={suggestion.creatorPfp}
                      creatorName={suggestion.creatorName}
                      creatorAge={suggestion.creatorAge}
                      creatorEmail={suggestion.creatorEmail}
                      submissionDate={suggestion.submissionDate}
                      onDelete={suggestionDeletedHandler}
                    />
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
      {(!isLoading && !loadedSuggestions) || (loginContext.currentUser.submittedSuggestions.length <= 0) && (
        <div className="Container">
          <Text
           label="No Suggestions Found!" 
           element="text" 
           value="To See Your Pending Suggestions, You Need To Submit One Below."
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default UserSuggestionsTable;
