import React from "react";
import Image from "../../../Shared/components/Visual-Elements/Image";
import { Container, ImageList } from "@mui/material";

function TankPhotosContainer(props) {
  return (
    <div>
      <ImageList sx={{ height: 1400 }} gap={4} cols={1}>
        {props.tankPhotoCollection.length > 0 && (
          props.tankPhotoCollection.map((photo) => {
            return(
            <div>
              <Image
                image={`http://localhost:5000/${photo}`}
                alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
                style={{width:"100%", hight:"25%"}}
              />
            </div>
            );
          })
        )}
      </ImageList>
      {/* {props.tankPhotoCollection.length > 0 && (
        props.tankPhotoCollection.map((photo) => {
          return(
            <div>
              <Image
                image={`http://localhost:5000/${photo}`}
                alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
                style={{width:"100%", hight:"25%"}}
              />
            </div>
          );
        })
      )} */}
      {!props.tankPhotoCollection.length > 0 && (
        <div>
          <h1>No Photos Exist For This Tank</h1>
        </div>
      )}
    </div>
  );
}

export default TankPhotosContainer;
