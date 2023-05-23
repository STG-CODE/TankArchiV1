import React from "react";
import Card from "../UI-Elements/Card"
import Image from "../Visual-Elements/Image";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

//Title is meant to contain the title of 
// the site which is in this case "TankArchi".
function Title() {
  return (
    <Card>
      <Grid2 sx={12}>
        <Image
          image="http://localhost:5000/uploads/stockImages/StockTankArchiLogo.png"
          alt={<h1>"TankArchi"</h1>}
          style={{width:"60%", hight:"20%"}}
        />
      </Grid2>
        
    </Card>
  );
}

export default Title;