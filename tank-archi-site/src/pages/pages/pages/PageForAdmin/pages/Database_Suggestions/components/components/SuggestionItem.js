import React, { useState , useContext } from "react";
//
import { LoginContext } from "../../../../../../../Shared/Context/login-context";
import { useHttpClient } from "../../../../../../../Shared/Hooks/http-hook";
//
import Button from "../../../../../../../Shared/components/Form-Elements/Button";
import Avatar from "../../../../../../../Shared/components/UI-Elements/Avatar";
import ErrorModal from "../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Modal from "../../../../../../../Shared/components/UI-Elements/Modal";



function SuggestionItem(props) {
  const loginContext = useContext(LoginContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteWarningHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/SuggestionsDatabase/${props.id}`,
        'DELETE'
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
        header="Are You Sure?"
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
        <p>Do you wish to delete this suggestion?</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <tr>
        <th>
          <h4>{props.id}</h4>
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
          <Avatar image={props.creatorPfp} alt={props.creatorName} style={{width:"100px", hight:"50px"}}/>
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
