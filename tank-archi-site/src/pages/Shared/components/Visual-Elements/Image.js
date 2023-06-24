import React from "react";

import './Image.css';

//is mainly used for big images and such
const Image = props => {
    return (
      <div className={` ${props.className || "image"}`} style={props.style}>
        <img
          src={props.image}
          alt={props.alt}
          style={{ width: props.width, height: props.width }}
        />
      </div>
    );
  };
  
  export default Image;