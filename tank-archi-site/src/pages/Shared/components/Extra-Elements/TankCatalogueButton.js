import React from 'react';
import { Link } from 'react-router-dom';

import './TankCatalogueButton.css';

const TankCatalogueButton = props => {
  return (
    <React.Fragment>
      <div>
      <Link to={props.to || `/MainPage/TankPage/${props.tankId || props._id}`}>
        <figure className='snip1190'>
          <img
            src={`http://localhost:5000/${props.image}`}
            alt={`http://localhost:5000/${props.alt}` || "No Tank Profile Detected"}
            style={{ width: props.width, height: props.width }}
          />
          <figcaption>
            <div className='square'>
              <div></div>
            </div>
            <h2>{props.tankName}</h2>
            <p>{props.nation}</p>
          </figcaption>
        </figure>
      </Link>
        
      </div>
    </React.Fragment>
    
  );
};

export default TankCatalogueButton;