import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <React.Fragment>
      <nav id="menu" className="">
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
      </nav>
    </React.Fragment>
  );
};

export default NavLinks;
