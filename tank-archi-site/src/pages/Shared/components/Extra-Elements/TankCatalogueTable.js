//basic import
import React from "react";
//component import
import TankCatalogueButton from "./TankCatalogueButton";
//Material UI import
import { ImageList } from "@mui/material";

function TankCatalogueTable(props) {
    return(
        <React.Fragment>
            <div>
                <table>
                    <ImageList maxWidth="xl" cols={3} rowHeight={164}>
                        {props.tanks.map((tank) => {
                        return (
                            <tbody>
                                <TankCatalogueButton
                                tankId={tank._id || tank.id}
                                tankName={tank.tankName}
                                image={tank.tankImagePfp}
                                alt={"uploads/stockImages/tankStockIcon.jpg"}
                                style={{width:"100%", hight:"75%"}}
                                />
                            </tbody>
                        )
                    })}
                    </ImageList>
                </table>
            </div>
        </React.Fragment>
    )
}

export default TankCatalogueTable;
