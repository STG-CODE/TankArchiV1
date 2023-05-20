import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function TankRating(props){
    const [value,setValue] = React.useState(props.Rating);
    return (
      <React.Fragment>
        {props.readOnly && (
          <Box sx={{'& > legend': { mt: 2 }}}>
          <Typography component="legend">
              Rate The Tank:
          </Typography>
          <Rating
            name="read-only-rating"
            value={value}
            precision={0.5}
            readOnly
          />
          </Box>
        )}
        {!props.readOnly && !props.isAdmin && (
        <Box sx={{'& > legend': { mt: 2 }}}>
            <Typography component="legend">
                Rate The Tank:
            </Typography>
            <Rating
              name="change-rating"
              value={value}
              onChange={(event,newValue) => {
                setValue(newValue);
              }}
              precision={0.5}
            />
        </Box>
      )}
      {!props.readOnly && props.isAdmin && (
        <Box sx={{'& > legend': { mt: 2 }}}>
          <Typography component="legend">
              Current Tank Rating:
          </Typography>
          <Rating
            name="disabled-rating"
            value={value}
            precision={0.5}
            disabled
          />
        </Box>
      )}
      </React.Fragment>
      
        
    )
}

export default TankRating;