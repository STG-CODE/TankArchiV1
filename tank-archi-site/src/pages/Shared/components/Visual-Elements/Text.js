import React from "react";

import "./Text.css";

const Text = (props) => {
  const { value, className, label } = props;

  let element;

  if (props.element === "textarea") {
    element = (
      <React.Fragment>
        <br />
        <textarea
         className={`${className} textarea` } 
         rows={props.rows || 3} 
         readOnly={true} 
         value={value}
         style={{resize: "none"}} 
        />
      </React.Fragment>
    );
  } else if (props.element === "text") {
    element = <React.Fragment><br/><text className={className ||"text" }>{value}</text></React.Fragment>
  } else if (props.element === "h6") {
    element = <React.Fragment><br/><h6 className={"h6" || className}>{value}</h6></React.Fragment>
  } else if (props.element === "h5") {
    element = <React.Fragment><br/><h5 className={"h5" || className}>{value}</h5></React.Fragment>
  } else if (props.element === "h4") {
    element = <React.Fragment><br/><h4 className={"h4" || className}>{value}</h4></React.Fragment>
  } else if (props.element === "h3") {
    element = <React.Fragment><br/><h3 className={"h3" || className}>{value}</h3></React.Fragment>
  } else if (props.element === "h2") {
    element = <React.Fragment><br/><h2 className={"h2" || className}>{value}</h2></React.Fragment>
  } else if (props.element === "h1") {
    element = <React.Fragment><br/><h1 className={"h1" || className}>{value}</h1></React.Fragment>
  } else {
    element = <p className={"p" || className}>{value}</p>;
  }

  return (
    <div className={className}>
      <label>
        <strong>
          {label}
        </strong>
      </label>
      {element}
    </div>
  );
};

export default Text;
