//basic imports
import React, { useState } from "react";
//component import
import RankingItem from "./RankingItem";
//TODO :

function Rankings(props) {
  let rank = 0;
  return (
    <React.Fragment>
      <div>
        <table>
            <thead>
                <tr>
                  <th>Rank:</th>
                  <th>Image:</th>
                  <th>Tank Name:</th>
                  <th>Nation:</th>
                  <th>Tank Role:</th>
                  <th>Era:</th>
                  <th>Service Period - Start Date:</th>
                  <th>Service Period - End Date:</th>
                  <th>Average Rating:</th>
                  <th>Votes:</th>
                  <th>Page Link:</th>
                </tr>
            </thead>
          {props.tanks.map((tank) => {
            rank = rank + 1;
            return (
              <tbody>
                <RankingItem
                id={tank.id}
                image={tank.tankImagePfp}
                tankName={tank.tankName}
                nation={tank.nation}
                combatRole={tank.combatRole}
                era={tank.era}
                startDate={tank.servicePeriod.startDate}
                endDate={tank.servicePeriod.endDate}
                rank={rank}
                avgRating={tank.avgRating}
                votes={tank.voteCount}
                alt={"uploads/stockImages/tankStockIcon.jpg"}
                style={{width:"160px", hight:"50px"}}
                />
              </tbody>
            )
          })}
        </table>
    </div>
    </React.Fragment>
    
  );
}

export default Rankings;