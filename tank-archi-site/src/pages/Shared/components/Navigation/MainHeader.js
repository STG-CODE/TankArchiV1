import React from "react";

import './MainHeader.css';

const MainHeader = props => {
    return (
        <React.Fragment>
            <header className="">
                {props.children}
            </header>
        </React.Fragment>
    )    
};

export default MainHeader;