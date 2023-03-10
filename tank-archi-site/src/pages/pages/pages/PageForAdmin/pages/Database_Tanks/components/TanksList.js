import React from "react";

import TankItem from "./components/TankItem";

function TanksList(props) {
  if (props.items.length === 0)
    return (
      <div className="Container">
        <h1>No Tanks Found!</h1>
      </div>
    );
  //here we return each item in the users list as the following parameters :
  // "key" = (the users id as a key) , "id" =  (the users actual id as an id) ,
  // "tankName" = (the tank's name) , "nation" = (the tank's nation') ,
  // "tankBattleRole" = (the tank's battle role) , "era" = (the tank's era to which it belongs) ,
  // "servicePeriod" = (the tank's service period) , "startDate" = (the tank's start of service date) ,
  // "endDate" = (the tank's end date of service date) , "accumulatedVoteCount" = (the tank's accumulated vote count')
  return (
    <div className="Container">
      
      <table>
        <thead>
          <tr>
            <th>
              <button>Sort :</button>
              <button>ID</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Name</button>
            </th>
            <th>
              <button>Main Image</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Nation</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Battle Role</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Era</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Service Period</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Service Start</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Service End</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Vote Count</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Average User Rating</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Creation Date</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Last Updated By Admin</button>
            </th>
            <th>
              <button>Options</button>
            </th>
          </tr>
        </thead>

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