//basic imports
import React, { useState , useContext } from "react";
//context import
import { LoginContext } from "../../../../../../../Shared/Context/login-context";
//hook import
import { useHttpClient } from "../../../../../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../../../../../Shared/components/Form-Elements/Button";
import Avatar from "../../../../../../../Shared/components/UI-Elements/Avatar";
import ErrorModal from "../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Modal from "../../../../../../../Shared/components/UI-Elements/Modal";
import Image from "../../../../../../../Shared/components/Visual-Elements/Image";

function SuggestionItem(props) {
  //login context
  const loginContext = useContext(LoginContext);
  //"confirm action" window state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //deconstruction of http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  //sets it to show the "confirm action" window
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  //sets it to hide the "confirm action" window
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  //handles confirmation of deletion when admin clicks
  const confirmDeleteWarningHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/${props.id}`,
        'DELETE',
        null,
        {Authorization: "Bearer " + loginContext.token}
      );
      console.log("Confirmed ,Deleting Suggestion!");
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Confirm Suggestion Deletion:"
        footerClass=""
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteWarningHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete <strong>{props.creatorName}'s "{props.tankName}"</strong> tank suggestion?</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <tr>
        <th>
          <h4>{props.id}</h4>
        </th>
        <th>
          <Image
           image={`http://localhost:5000/${props.suggestionPfp || 
            "uploads/stockImages/stockSuggestionPic.png"}`} 
           alt={"No Suggestion Profile Image!"} 
           style={{width:"100px", hight:"50px"}}
          />
        </th>
        <th>
          <h4>{props.tankName}</h4>
        </th>
        <th>
          <h4>{props.age}</h4>
        </th>
        <th>
          <h4>{props.nation}</h4>
        </th>
        <th>
          <Avatar
           image={`http://localhost:5000/${props.creatorPfp ||
           "uploads/stockImages/stockPfpPicture.jpg"}`} 
           alt={props.creatorName} 
           style={{width:"100px", hight:"50px"}}
          />
        </th>
        <th>
          <h4>{props.creatorName}</h4>
        </th>
        <th>
          <h4>{props.creatorAge}</h4>
        </th>
        <th>
          <h4>{props.creatorEmail}</h4>
        </th>
        <th>
          <h4>{props.submissionDate}</h4>
        </th>
          {!loginContext.isAdmin && (
            <th>
              <Button inverse to={`/MainPage/User/EditSuggestion/${props.id}`}>
            Edit
          </Button>
          /
          <Button to={`/MainPage/User/ReviewSuggestion/${props.id}`}>
            Review
          </Button>
          /
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
            </th>
          )}
          {loginContext.isAdmin && (
            <th>
          <Button inverse to={`/MainPage/Admin/SuggestionsDatabase/EditSuggestion/${props.id}`}>
            Edit
          </Button>
          /
          <Button to={`/MainPage/Admin/SuggestionsDatabase/ReviewSuggestion/${props.id}`}>
            Review
          </Button>
          /
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
            </th>
          )}
      </tr>
    </React.Fragment>
  );
}
export default SuggestionItem;
