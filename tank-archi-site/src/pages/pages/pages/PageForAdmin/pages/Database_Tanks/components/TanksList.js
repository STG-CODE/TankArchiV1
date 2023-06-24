//basic imports
import React from "react";
//component import
import TankItem from "./components/TankItem";
//Material Ui Imports
import { TableCell, TableHead, TableRow } from "@mui/material";

function TanksList(props) {
  //if there is no tanks in the list then we will show the following massage
  if (props.items.length === 0)
    return (
      <div className="Container">
        <h1>No Tanks Found!</h1>
      </div>
    );
  ////here we return each item in the users list as the following parameters :
  //// "key" = (the users id as a key) , "id" =  (the users actual id as an id) ,
  //// "tankName" = (the tank's name) , "nation" = (the tank's nation') ,
  //// "tankBattleRole" = (the tank's battle role) , "era" = (the tank's era to which it belongs) ,
  //// "servicePeriod" = (the tank's service period) , "startDate" = (the tank's start of service date) ,
  //// "endDate" = (the tank's end date of service date) , "accumulatedVoteCount" = (the tank's accumulated vote count')
  return (
    <div className="Container">
      <table>
        <TableHead>
          <TableRow>
            <TableCell>Tank ID :</TableCell>
            <TableCell>Name :</TableCell>
            <TableCell>Tank Profile Image :</TableCell>
            <TableCell>Nation :</TableCell>
            <TableCell>Combat Role :</TableCell>
            <TableCell>Tank Era :</TableCell>
            <TableCell>Service Period :</TableCell>
            <TableCell>Service Period Start :</TableCell>
            <TableCell>Service Period End :</TableCell>
            <TableCell>Vote Count :</TableCell>
            <TableCell>Average User Rating :</TableCell>
            <TableCell>Creation Date :</TableCell>
            <TableCell>Last Updated By Admin :</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        {props.items.map((tank) => {
          return (
            <tbody>
              <TankItem
                key={tank.id}
                id={tank.id}
                tankName={tank.tankName}
                tankImagePfp={tank.tankImagePfp}
                nation={tank.nation}
                combatRole={tank.combatRole}
                era={tank.era}
                startDate={tank.servicePeriod.startDate}
                endDate={tank.servicePeriod.endDate}
                voteCount={tank.voteCount}
                avgRating={tank.avgRating}
                uploadDate={tank.uploadDate}
                lastUpdated={tank.lastUpdated}
                onDelete={props.onDeleteTank}
              />
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default TanksList;
