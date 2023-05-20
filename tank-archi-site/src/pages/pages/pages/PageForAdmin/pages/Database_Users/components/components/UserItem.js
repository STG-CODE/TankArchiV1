//basic imports
import React, { useContext, useState } from "react";
//hook import
import { useHttpClient } from "../../../../../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../../../../../Shared/components/Form-Elements/Button";
import Avatar from "../../../../../../../Shared/components/UI-Elements/Avatar";
import ErrorModal from "../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Modal from "../../../../../../../Shared/components/UI-Elements/Modal";
//context import
import { LoginContext } from "../../../../../../../Shared/Context/login-context";

function UserItem(props) {
  //login context
  const loginContext = useContext(LoginContext);
  //contains state of the "confirm window" that would show in case of deletion
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //changes the state of the "confirm window" to true
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  //changes the state of the "confirm window" to false
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  //handles the case in which the admin decides to delete a tank from the database
  const confirmDeleteWarningHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/UsersDatabase/${props.id}`,
        "DELETE",
        null,
        {Authorization: "Bearer " + loginContext.token}
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
        header="Confirm User Deletion:"
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
        <p>Are you sure that you want to delete <strong>{props.username}</strong> from the database?</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <tr>
        <th>
          <h4>{props.id}</h4>
        </th>
        <th>
          <Avatar
           image={`http://localhost:5000/${props.imagePfp}`} 
           alt={props.username} 
           style={{width:"100px", hight:"50px"}}
          />
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
