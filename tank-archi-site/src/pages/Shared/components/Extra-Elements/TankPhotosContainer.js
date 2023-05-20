import React from "react";
import Image from "../../../Shared/components/Visual-Elements/Image";

function TankPhotosContainer(props) {
  return (
    <div>
      {props.tankPhotoCollection.length > 0 && (
        props.tankPhotoCollection.map((photo) => {
          return(
            <div>
              <Image
                image={`http://localhost:5000/${photo}`}
                alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
                style={{width:"25%", hight:"20%"}}
              />
            </div>
          );
        })
      )}
      {!props.tankPhotoCollection.length > 0 && (
        <div>
          <h1>No Photos Exist For This Tank</h1>
        </div>
      )}
    </div>
  );
}

export default TankPhotosContainer;
