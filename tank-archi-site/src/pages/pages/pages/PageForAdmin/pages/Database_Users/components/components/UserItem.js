import React, { useState } from "react";
//
import { useHttpClient } from "../../../../../../../Shared/Hooks/http-hook";
//
import Button from "../../../../../../../Shared/components/Form-Elements/Button";
import Avatar from "../../../../../../../Shared/components/UI-Elements/Avatar";
import ErrorModal from "../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Modal from "../../../../../../../Shared/components/UI-Elements/Modal";


function UserItem(props) {
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
        `http://localhost:5000/MainPage/Admin/UsersDatabase/${props.id}`,
        "DELETE"
      );
      console.log("Confirmed ,Deleting User!");
      props.onDelete(props.id);
    } catch (err) {}
  };

  //!add warning editing of user information and so forth!//
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
        <p>Do you wish to delete this user?</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <tr>
        <th>
          <h4>{props.id}</h4>
        </th>
        <th>
          <Avatar image={props.imagePfp} alt={props.username} style={{width:"100px", hight:"50px"}}/>
        </th>
        <th>
          <h4>{props.username}</h4>
        </th>
        <th>
          <h4>{props.email}</h4>
        </th>
        <th>
          <h4>{props.firstName}</h4>
        </th>
        <th>
          <h4>{props.lastName}</h4>
        </th>
        <th>
          <h4>{props.age}</h4>
        </th>
        <th>
          <h4>{props.country}</h4>
        </th>
        <th>
          <h4>
            {props.favTanksList} {props.favTanksList === 1 ? "Tank" : "Tanks"}
          </h4>
        </th>
        <th>
          <h4>
            {props.submittedSuggestions}{" "}
            {props.submittedSuggestions === 1 ? "Suggestion" : "Suggestions"}
          </h4>
        </th>
        <th>
            <Button to={`/MainPage/Admin/UsersDatabase/EditUser/${props.id}`}>
              Edit
            </Button>
            /
            <Button to={`/MainPage/Admin/UsersDatabase/ReviewUser/${props.id}`}>
              Review
            </Button>
            /
            <Button disabled={props.isAdmin} danger onClick={showDeleteWarningHandler}>
              Delete
            </Button>
        </th>
      </tr>
    </React.Fragment>
  );
}
export default UserItem;
