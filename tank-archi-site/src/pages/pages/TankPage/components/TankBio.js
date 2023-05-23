//basic import
import React from "react";
//components import
import Text from "../../../Shared/components/Visual-Elements/Text";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function TankBio(props) {
  return (
    <div>
      <Grid2 spacing={1} sx={12}>
        <Grid2 sx={12}>
          <Text element={"h3"} value={`${props.name}'s Overall History:`}/>
          <Text element={"textarea"} value={props.history} />
        </Grid2>
        <Grid2 sx={12}>
          <Text element={"h3"} value={`${props.name}'s Service Record:`}/>
          <Text element={"textarea"} value={props.service} />
        </Grid2>
        <Grid2 sx={12}>
          <Text element={"h3"} value={`${props.name}'s Service State Information:`}/>
          <Text element={"textarea"} value={props.serviceState} />
        </Grid2>
        <Grid2 sx={12}>
          <Text element={"h3"} value={`${props.name}'s Production History:`}/>
          <Text element={"textarea"} value={props.production} />
        </Grid2>
        <Grid2 sx={12}>
          <Text element={"h3"} value={`${props.name}'s Armaments And Armour Details:`}/>
          <Text element={"textarea"} value={props.armsAndArmour} />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default TankBio;