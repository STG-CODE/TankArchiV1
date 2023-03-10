import React from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css"

const MainNavigation = props => {
    return (
        <React.Fragment>
            <MainHeader>
                <NavLinks />
            </MainHeader>
        </React.Fragment>
    )
};

export default MainNavigation;