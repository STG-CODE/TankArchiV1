import React from "react";
//
import SuggestionItem from "./components/SuggestionItem";

function SuggestionsList(props) {
  if (props.items.length === 0)
    return (
      <div className="Container">
        <h1>No Suggestions Found!</h1>
      </div>
    );
  //here we return each item in the users list as the following parameters :
  // "key" = (the users id as a key) , "id" =  (the users actual id as an id) ,
  // "tankName" = (the suggestion's tank name) , "username" = (the suggestion's submitter's username) ,
  // "age" = (the suggestion user's age) , "nation" = (the suggestion's nation to which the tank in it belongs) ,
  // "email" = (the suggestion submitter's email address) , "submissionDate" = (the suggestion's submission date) ,
  return (
    <div className="Container">
      <table>
        <thead>
          <tr>
            <th>
              <button>Sort :</button>
              <button>ID</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Tank Name</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Tank Age</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Tank Nation</button>
            </th>
            <th>
              <button>User Profile Picture</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Username</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>User Age</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>User Email</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Submission Date</button>
            </th>
            <th>
              <button>Options</button>
            </th>
          </tr>
        </thead>

        {props.items.map(suggestion => (
            
            <tbody>
              <SuggestionItem
                key={suggestion.id}
                id={suggestion.id}
                tankName={suggestion.tankName}
                age={suggestion.age}
                nation={suggestion.nation}
                creatorPfp={suggestion.creatorPfp}
                creatorName={suggestion.creatorName}
                creatorAge={suggestion.creatorAge}
                creatorEmail={suggestion.creatorEmail}
                submissionDate={suggestion.submissionDate}
                onDelete={props.onDeleteSuggestion}
              />
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default SuggestionsList;