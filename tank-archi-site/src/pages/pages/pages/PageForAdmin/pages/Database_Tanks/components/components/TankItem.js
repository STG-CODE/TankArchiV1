//basic imports
import React, { useContext, useState } from "react";
//hook imports
import { useHttpClient } from "../../../../../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Modal from "../../../../../../../Shared/components/UI-Elements/Modal";
import Image from "../../../../../../../Shared/components/Visual-Elements/Image";
//context import
import { LoginContext } from "../../../../../../../Shared/Context/login-context";
import { TableCell } from "@mui/material";

function TankItem(props) {
  //login context
  const loginContext = useContext(LoginContext);
  //contains state of the "confirm window" that would show in case of deletion
  const [showConfirmModal,setShowConfirmModal] = useState(false);
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
        `http://localhost:5000/MainPage/Admin/TanksDatabase/${props.id}`,
        'DELETE',
        null,
        {Authorization: "Bearer " + loginContext.token}
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
      header="Confirm Tank Deletion:" 
      footerClass="" 
      footer={
        <React.Fragment>
          <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
          <Button danger onClick={confirmDeleteWarningHandler}>DELETE</Button>
        </React.Fragment>
      }>
        <p>Are you sure that you want to delete the <strong>{props.tankName}</strong> from the database?</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <TableCell component="th" scop="row">
        {props.id}
      </TableCell>
      <TableCell align="right">
        {props.tankName}
      </TableCell>
      <TableCell align="right">
        <Image
          image={`http://localhost:5000/${props.tankImagePfp ||
          "uploads/stockImages/tankStockIcon.jpg"}`} 
          alt={"No Tank Profile Image!"}
          style={{width:"100%", hight:"100%"}}
        />
      </TableCell>
      <TableCell align="right">
        {props.nation}
      </TableCell>
      <TableCell align="right">
        {props.combatRole}
      </TableCell>
      <TableCell align="right">
        {props.era}
      </TableCell>
      <TableCell align="right">
        {props.startDate}
        {" - "}
        {props.endDate}
      </TableCell>
      <TableCell align="right">
        {props.startDate}
      </TableCell>
      <TableCell align="right">
        {props.endDate}
      </TableCell>
      <TableCell align="right">
        {props.voteCount} {props.voteCount === 1 ? "Vote" : "Votes"}
      </TableCell>
      <TableCell align="right">
        {props.avgRating}
      </TableCell>
      <TableCell align="right">
        {props.uploadDate}
      </TableCell>
      <TableCell align="right">
        {props.lastUpdated}
      </TableCell>
      <TableCell align="right">
          <Button to={`/MainPage/Admin/TanksDatabase/EditTank/${props.id}`}>
            Edit
          </Button>
          <Button to={`/MainPage/Admin/TanksDatabase/ReviewTank/${props.id}`}>
            Review
          </Button>
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
      </TableCell>
    </React.Fragment>
  );
}
export default TankItem;
