import React, { useReducer, useEffect } from "react";

import { validate } from "../../Util/validators";

//(Note) We use the "useEffect" here so that we can
// run some logic whenever the value or validity changes
// (in our case its related to the "Input" tag).

//(Note) We use the "useReducer" hook here because it allows us to
// manage state in the component and also allows us to call a function
// that we can use to rerenders the component.
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

//Used for a preset input tag that can be easily customized when mentioned.
const Input = (props) => {
  //here we define our default input state
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  //
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //here we define variables for our change handler in this case
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  //here we define variables for our touch handler in this case
  const touchHandler = (event) => {
    dispatch({
      type: "TOUCH",
    });
  };

  //here we define our optional types of inputs like regular input and textarea
  const element =
    props.element === "input" ? (
      <React.Fragment>
        <br />
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <br />
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          style={{resize: "none"}}
        />
      </React.Fragment>
    );
  //here we render the following code and depending on
  // the condition of the input state we will see diffident input tag style and text.
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
