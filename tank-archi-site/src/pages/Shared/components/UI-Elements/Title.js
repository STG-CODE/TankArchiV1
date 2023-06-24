import React from "react";
import Card from "../UI-Elements/Card"
import Image from "../Visual-Elements/Image";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./Title.css";

//Title is meant to contain the title of 
// the site which is in this case "TankArchi".
function Title() {
  return (
    <Card className="none">
      <Grid2 sx={12}>
        <Card className="title"/>
        {/* <Image
          className="title"
          image="http://localhost:5000/uploads/stockImages/StockTankArchiLogo.png"
          alt={<h1>"TankArchi"</h1>}
        /> */}
      </Grid2>
        
    </Card>
  );
}

export default Title;