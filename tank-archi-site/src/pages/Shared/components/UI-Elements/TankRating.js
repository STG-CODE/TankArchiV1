import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import "./TankRating.css";
import Text from "../Visual-Elements/Text";

function TankRating(props){
    const [value,setValue] = React.useState(props.Rating);

    const ratingButtonHandler = (event,newValue) => {
      setValue(newValue);
    }

    return (
      <React.Fragment>
        {props.readOnly && (
          <React.Fragment>
            <Text element="text" value={props.text}/>
            <Rating
              name="read-only-rating"
              value={value}
              precision={0.5}
              readOnly
            />
          </React.Fragment>
        )}
        {!props.readOnly && !props.isAdmin && (
          <React.Fragment>
            <Text element="text" value={props.text}/>
            <Rating
              name="change-rating"
              value={value}
              onChange={ratingButtonHandler}
              precision={0.5}
            />
          </React.Fragment>
      )}
      {!props.readOnly && props.isAdmin && (
        <React.Fragment>
          <Text element="text" value={props.text}/>
          <Rating
            name="disabled-rating"
            value={value}
            precision={0.5}
            disabled
          />
        </React.Fragment>
      )}
      </React.Fragment>    
    )
}

export default TankRating;