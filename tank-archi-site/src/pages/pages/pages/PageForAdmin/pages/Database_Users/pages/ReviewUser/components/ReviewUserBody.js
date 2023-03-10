import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
//
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Card from "../../../../../../../../Shared/components/UI-Elements/Card";
import Avatar from "../../../../../../../../Shared/components/UI-Elements/Avatar";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
//
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";

function ReviewUserBody() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = useParams().userId;
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/UsersDatabase/EditUser/${userId}`
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    console.log("Fetching The User!");
    fetchUser();
    console.log("Done Fetching The User!");
  }, [sendRequest, setLoadedUser]);

  //!create buttons for the possible options that the admin has!//

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && (
        <div className="Container">
          <Card>
            <Text
              label="User's Created Account Date:"
              value={loadedUser.creationDate}
            />
            <Text
              label="Last Logged In:"
              value={loadedUser.lastLoginDate || "- User Didn't Login Yet -"}
            />
            <Text
              label="Last Changes Made:"
              value={
                loadedUser.lastAccountChanges ||
                "- User's Details Didn't Change -"
              }
            />
            <Card>
              <Avatar
                image={loadedUser.imagePfp}
                alt={"- Missing Tank Pfp -"}
                style={{ width: "100px", hight: "50px" }}
              />
            </Card>
            <Card>
              <Text
                label="Username:"
                element="text"
                value={loadedUser.username}
              />
              <Text label="Email:" element="text" value={loadedUser.email} />
              <Text
                label="First Name:"
                element="text"
                value={loadedUser.firstName}
              />
              <Text
                label="Last Name:"
                element="text"
                value={loadedUser.lastName}
              />
              <Text
                label="Country:"
                element="text"
                value={loadedUser.country}
              />
              <Text label="Age:" element="text" value={loadedUser.age} />
              <Text label="Company:" value={loadedUser.company || " None"} />
              <Text
                label="Publisher:"
                value={loadedUser.publisher || " None"}
              />
              <Text
                label="Association:"
                value={loadedUser.association || " None"}
              />
              <Text
                label="Social Group Type:"
                value={loadedUser.socialType || " None"}
              />
              <Text
                label="Social Group Name:"
                value={loadedUser.socialName || " None"}
              />
              <Text
                label="Count Of Submitted Suggestions:"
                value={loadedUser.submittedSuggestions.length || " None"}
              />
              <Text
                label="Count Of Favoured Tanks:"
                value={loadedUser.favTanksList.length || " None"}
              />
              <Text
                label="User's Favorite Nation:"
                value={loadedUser.favNation || " None"}
              />
            </Card>
          </Card>
          <div>
            <Button to="/MainPage/Admin/UsersDatabase">
              Go Back
            </Button>
            <Button to="/MainPage/Admin/UsersDatabase/EditUser">
              Edit User
            </Button >
            <Button to="/MainPage/Admin/UsersDatabase">
              Delete User
            </Button>
          </div>
        </div>
      )}
      {!isLoading && !error && !loadedUser && (
        <div>
          <h2>Could Not Find User Details For Review!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default ReviewUserBody;
