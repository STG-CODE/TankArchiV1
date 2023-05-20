//basic import
import React from "react";
//components import
import Text from "../../../Shared/components/Visual-Elements/Text";

function TankBio(props) {
  return (
    <div>
      <Text
       label={`${props.name}'s Overall History:`} 
       element={"textarea"} value={props.history} 
      />
      <Text
       label={`${props.name}'s Service Record:`} 
       element={"textarea"} value={props.service} 
      />
      <Text
       label={`${props.name}'s Service State Information:`} 
       element={"textarea"} value={props.serviceState} 
      />
      <Text
       label={`${props.name}'s Production History:`} 
       element={"textarea"} value={props.production} 
      />
      <Text
       label={`${props.name}'s Armaments And Armour Details:`} 
       element={"textarea"} value={props.armsAndArmour} 
      />
    </div>
  );
}

export default TankBio;