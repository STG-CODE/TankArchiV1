import React, { useEffect, useState } from "react";
//
import SuggestionsList from "./components/SuggestionsList";
//
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
//
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../../Shared/components/Form-Elements/Button";

function SuggestionsDatabase() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSuggestions, setLoadedSuggestions] = useState();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/MainPage/Admin/SuggestionsDatabase'
        );
        setLoadedSuggestions(responseData.suggestions);
      } catch (err) {}
    };
    fetchSuggestions();
  }, [sendRequest]);

  const suggestionDeletedHandler = deletedSuggestionId => {
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
      {!isLoading && loadedSuggestions && (
        <div className="Container">
          <div>
            <Text element="h3" value="Suggestions Management Page:" />
            <SuggestionsList
             items={loadedSuggestions} 
             onDeleteSuggestion={suggestionDeletedHandler}
            />
            <div>
              <Button to="/MainPage/Admin">
                Go Back
              </Button>
              <Button to="/MainPage">
                Head To Main Page
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !loadedSuggestions && (
      <div className="Container">
        <h1>No Suggestions Found!</h1>
      </div>
      )}
    </React.Fragment>
  );
}

export default SuggestionsDatabase;
