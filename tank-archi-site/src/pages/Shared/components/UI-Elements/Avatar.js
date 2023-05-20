import React from 'react';

import './Avatar.css';

//is used for profile pictures and such
const Avatar = props => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        onError={props.onError}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
