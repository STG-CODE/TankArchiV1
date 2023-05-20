import React from "react";
import Card from "../UI-Elements/Card"
import Image from "../Visual-Elements/Image";

//Title is meant to contain the title of 
// the site which is in this case "TankArchi".
function Title() {
  return (
    <Card>
      <Image
      image="http://localhost:5000/uploads/stockImages/StockTankArchiLogo.png"
      alt={<h1>"TankArchi"</h1>}
      style={{width:"360px", hight:"100px"}}
      />
    </Card>
  );
}

export default Title;