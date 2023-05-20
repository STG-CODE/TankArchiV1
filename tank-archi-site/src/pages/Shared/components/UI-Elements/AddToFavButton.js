import * as React from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";

function AddToFavButton(props) {
  return (
    <React.Fragment>
      {!props.isAdmin && (
        <Button color="secondary" variant="contained" startIcon={<FavoriteIcon size="large" />}>
          Add To Favorites
        </Button>
      )}
      {props.isAdmin && (
        <Button disabled color="secondary" variant="contained" startIcon={<FavoriteIcon size="large" />}>
          Add To Favorites
        </Button>
      )}
    </React.Fragment>
  );
}

export default AddToFavButton;
