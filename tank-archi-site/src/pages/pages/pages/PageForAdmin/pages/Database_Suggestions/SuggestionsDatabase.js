//basic import
import React, { useContext, useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
//component imports
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Button from "../../../../../Shared/components/Form-Elements/Button";
import SuggestionsList from "./components/SuggestionsList";
import Card from "../../../../../Shared/components/UI-Elements/Card";
//context import
import { LoginContext } from "../../../../../Shared/Context/login-context";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function SuggestionsDatabase() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded suggestion state
  const [loadedSuggestions, setLoadedSuggestions] = useState();

  //useEffect - used to fetch suggestion
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/MainPage/Admin/SuggestionsDatabase",
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedSuggestions(responseData.suggestions);
      } catch (err) {}
    };
    fetchSuggestions();
  }, [sendRequest]);

  //handles the result of a suggestion being deleted
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
          <Grid2 container spacing={1}>
            <Grid2 xs={12}>
              <Card>
                <Text element="h2" value="Suggestions Management Page:" />
                <SuggestionsList
                  items={loadedSuggestions} 
                  onDeleteSuggestion={suggestionDeletedHandler}
                />
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <Button to="/MainPage/Admin">
                  Go Back
                </Button>
                <Button to="/MainPage">
                  Head To Main Page
                </Button>
              </Card>
            </Grid2>
          </Grid2>
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
