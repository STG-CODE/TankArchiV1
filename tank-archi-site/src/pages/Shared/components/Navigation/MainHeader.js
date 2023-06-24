import React from "react";

import './MainHeader.css';

const MainHeader = props => {
    return (
        <React.Fragment>
            <header>
                {props.children}
            </header>
        </React.Fragment>
    )    
};

export default MainHeader;