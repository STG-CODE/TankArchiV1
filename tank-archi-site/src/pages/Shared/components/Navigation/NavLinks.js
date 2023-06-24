//basic imports
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
//imported CSS
import "./NavLinks.css";
//Material UI imports
import { Tabs, tabsClasses } from "@mui/material";
//component imports
import Button from "../Form-Elements/Button";

const NavLinks = (props) => {
  
  const [value,setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Tabs
      className="MuiTabs-scrollButtons MuiTabs-scrollButtonsHideMobile" 
      value={false}
      variant="scrollable" 
      scrollButtons="auto"
      allowScrollButtonsMobile
      onChange={handleChange}
      sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}>
          <Button id="toggle" className="button-89" to="/MainPage">Tank Catalogue</Button>
          <Button id="toggle2" className="button-89" to="/MainPage/Search">Search</Button>
          <Button id="toggle3" className="button-89" to="/MainPage/Rankings">Rankings</Button>
          <Button id="toggle4" className="button-89" to="/MainPage/TankFest">TankFest</Button>
          <Button id="toggle5" className="button-89" to="/MainPage/Recommended">Media & Entertainment</Button>
          <Button id="toggle6" className="button-89" to="/MainPage/SiteGuide">Site Guide</Button>
          <Button id="toggle7" className="button-89" to="/MainPage/AboutUs">About Us</Button>
      </Tabs>
      {/* <nav className="">
        <ul>
          <li>
            <NavLink to="/MainPage">Tank Catalogue</NavLink>
          </li>
          <li>
            <NavLink to="/MainPage/Search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/MainPage/Rankings">Rankings</NavLink>
          </li>
          <li>
            <NavLink to="/MainPage/TankFest">TankFest</NavLink>
          </li>
          <li>
            <NavLink to="/MainPage/Recommended">Media & Entertainment</NavLink>
          </li>
          <li>
            <NavLink to="/MainPage/SiteGuide">Site Guide</NavLink>
          </li>
          <li>
            <NavLink to="/MainPage/AboutUs">About Us</NavLink>
          </li>
        </ul>
      </nav> */}
    </React.Fragment>
  );
};

export default NavLinks;
