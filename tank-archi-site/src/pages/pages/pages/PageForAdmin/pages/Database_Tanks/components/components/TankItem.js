import React, { useState } from "react";
//
import { useHttpClient } from "../../../../../../../Shared/Hooks/http-hook";
//
import Button from "../../../../../../../Shared/components/Form-Elements/Button";
import Avatar from "../../../../../../../Shared/components/UI-Elements/Avatar";
import ErrorModal from "../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Modal from "../../../../../../../Shared/components/UI-Elements/Modal";



function TankItem(props) {
  const [showConfirmModal,setShowConfirmModal] = useState(false);
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
        `http://localhost:5000/MainPage/Admin/TanksDatabase/${props.id}`,
        'DELETE'
      );
      console.log("Confirmed ,Deleting Tank!");
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
          <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
          <Button danger onClick={confirmDeleteWarningHandler}>DELETE</Button>
        </React.Fragment>
      }>
        <p>Do you wish to delete this tank?</p>
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
          <Avatar image={props.tankImagePfp} alt={"Missing image"}/>
        </th>
        <th>
          <h4>{props.nation}</h4>
        </th>
        <th>
          <h4>{props.combatRole}</h4>
        </th>
        <th>
          <h4>{props.era}</h4>
        </th>
        <th>
          <h4>
            {props.startDate}
            {" - "}
            {props.endDate}
          </h4>
        </th>
        <th>
          <h4>{props.startDate}</h4>
        </th>
        <th>
          <h4>{props.endDate}</h4>
        </th>
        <th>
          <h4>
            {props.voteCount} {props.voteCount === 1 ? "Vote" : "Votes"}
          </h4>
        </th>
        <th>
          <h4>{props.avgRating}</h4>
        </th>
        <th>
          <h4>{props.uploadDate}</h4>
        </th>
        <th>
          <h4>{props.lastUpdated}</h4>
        </th>
        <th>
          <Button inverse to={`/MainPage/Admin/TanksDatabase/EditTank/${props.id}`}>
            Edit
          </Button>
          /
          <Button to={`/MainPage/Admin/TanksDatabase/ReviewTank/${props.id}`}>
            Review
          </Button>
          /
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
        </th>
      </tr>
    </React.Fragment>
  );
}
export default TankItem;
