//basic imports
import React from "react";
//component import
import Text from "../../../Shared/components/Visual-Elements/Text";
import TankRating from "../../../Shared/components/UI-Elements/TankRating";

function TankBasicInfo(props) {
  return (
    <div>
      <Text
        label={`${props.tank.tankName}'s Creator Nation:`}
        element={"text"}
        value={props.tank.nation}
      />
      <Text
        label={`The Nations That Used The ${props.tank.tankName}:`}
        element={"text"}
        value={props.tank.userNations}
      />
      <Text
        label={`${props.tank.tankName}'s Combat Role:`}
        element={"text"}
        value={props.tank.combatRole}
      />
      <Text
        label={`${props.tank.tankName}'s Current Service States:`}
        element={"text"}
        value={props.tank.serviceStates}
      />
      <Text
        label={`${props.tank.tankName}'s Generation:`}
        element={"text"}
        value={props.tank.generation}
      />
      <Text
        label={`${props.tank.tankName}'s Prevalent Era:`}
        element={"text"}
        value={props.tank.era}
      />
      <Text
        label={`${props.tank.tankName}'s Age:`}
        element={"text"}
        value={props.tank.age}
      />
      <Text
        label={`${props.tank.tankName}'s Service Period:`}
        element={"text"}
        value={`${props.tank.servicePeriod.startDate} - ${props.tank.servicePeriod.endDate}`}
      />
      <Text
        label={`${props.tank.tankName}'s Avg Rating:`}
        element={"text"}
        value={props.tank.avgRating}
      />
      <TankRating 
        readOnly={true} 
        rating={props.tank.avgRating} 
        text={`${props.tank.tankName}'s current star rating:`}
        />
      //!change so that we enter the values here instead of in the component it
      self
      <Text
        label={`${props.tank.tankName}'s Current "Like" Votes:`}
        element={"text"}
        value={props.tank.voteCount}
      />
    </div>
  );
}

export default TankBasicInfo;
