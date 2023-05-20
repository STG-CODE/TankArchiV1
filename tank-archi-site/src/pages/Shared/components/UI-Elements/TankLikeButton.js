import * as React from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function TankLikeButton(props) {
  return (
    <React.Fragment>
      {!props.isAdmin && (
        <Button variant="contained" endIcon={<ThumbUpIcon size="large" />}>
          Like +1
        </Button>
      )}
      {props.isAdmin && (
        <Button disabled variant="contained" endIcon={<ThumbUpIcon size="large" />}>
          Like +1
        </Button>
      )}
    </React.Fragment>
  );
}

export default TankLikeButton;
