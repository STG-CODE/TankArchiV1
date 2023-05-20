import React from "react";

import './Image.css';

//is mainly used for big images and such
const Image = props => {
    return (
      <div className={`image ${props.className}`} style={props.style}>
        <img
          src={props.image}
          alt={props.alt}
          style={{ width: props.width, height: props.width }}
        />
      </div>
    );
  };
  
  export default Image;