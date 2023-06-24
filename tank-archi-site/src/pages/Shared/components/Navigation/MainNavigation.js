import React from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import Card from "../UI-Elements/Card";

const MainNavigation = props => {
    return (
        <React.Fragment>
            <Card>
                <MainHeader>
                    <NavLinks />
                </MainHeader>
            </Card>
        </React.Fragment>
    )
};

export default MainNavigation;