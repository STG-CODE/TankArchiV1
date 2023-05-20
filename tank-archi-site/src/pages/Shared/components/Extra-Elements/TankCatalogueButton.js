import React from 'react';
import { Link } from 'react-router-dom';

import './TankCatalogueButton.css';

const TankCatalogueButton = props => {
  return (
    <div className={`tankCatalogueButton ${props.className}`} style={props.style}>
      <Link to={props.to || `/MainPage/TankPage/${props.tankId || props._id}`}>
      <button title={`Click To Visit The ${props.tankName || "Unknown"} Tank`}>
        <img
        src={`http://localhost:5000/${props.image}`}
        alt={`http://localhost:5000/${props.alt}` || "No Tank Profile Detected"}
        style={{ width: props.width, height: props.width }}
        />
      </button>
      </Link>
    </div>
  );
};

export default TankCatalogueButton;