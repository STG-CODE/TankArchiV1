import React from "react";
import TankCatalogueButton from "./TankCatalogueButton";

function TankCatalogueTable(props) {
    return(
        <React.Fragment>
            <div>
                <table>
                    {props.tanks.map((tank) => {
                        return (
                            <tbody>
                                <TankCatalogueButton
                                tankId={tank._id || tank.id}
                                tankName={tank.tankName}
                                image={tank.tankImagePfp}
                                alt={"uploads/stockImages/tankStockIcon.jpg"}
                                style={{width:"360px", hight:"100px"}}
                                />
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </React.Fragment>
    )
}

export default TankCatalogueTable;
