//basic imports
import React from "react";
//component imports
import Card from "../../../Shared/components/UI-Elements/Card";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function DetailsBar(props) {
  return (
    <div className="Container">
      <Card>
        <Grid2 container spacing={2}>
          <Grid2 xs={4}>
            <Text
              element={"text"}
              label="Account Creation Date : "
              value={`${props.user.creationDate}`}
            />
          </Grid2>
          <Grid2 xs={4}>
            <Text
              element={"text"}
              label="Last Login Date : "
              value={`${props.user.lastLoginDate || "First Time Logging In"}`}
            />
          </Grid2>
          <Grid2 xs={4}>
            <Text
              element={"text"}
              label="Last Account Changes : "
              value={`${
                props.user.lastAccountChanges || "There Were No Changes Made Yet"
              }`}
            />
          </Grid2>
          <Grid2 xs={4}>
            <Text
              element={"text"}
              label="Current Date & Time: "
              value={`${new Date()}`}
            />
          </Grid2>
        </Grid2>
      </Card>
      {!props.user.isAdmin && (
        <Card>
          <Grid2 container spacing={2}>
            <Grid2 xs={4}>
              <Text
                element={"text"}
                label="Favorite Nation: "
                value={props.user.favNation || "None At The Moment"}
              />
            </Grid2>
            <Grid2 xs={4}>
              <Text
                element={"text"}
                label="Favorite Tanks Count: "
                value={props.user.favTanksList.length || "None At The Moment"}
              />
            </Grid2>
            <Grid2 xs={4}>
              <Text
                element={"text"}
                label="Favorite Tanks Count: "
                value={props.user.ratedTanks || "None At The Moment"}
              />
            </Grid2>
            <Grid2 xs={4}>
              <Text
                element={"text"}
                label="Submitted Suggestions Count: "
                value={props.user.submittedSuggestions.length}
              />
            </Grid2>
          </Grid2>
        </Card>
      )}
    </div>
  );
}

export default DetailsBar;
