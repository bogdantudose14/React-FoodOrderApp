import classes from './Input.module.css';
import React from 'react';
const Input = React.forwardRef((props, ref) => {
  //receive ref as a second parameter after enclosing it in React.forwardRef
  // we can then forward the ref property on the input
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {/* the spread operator ensures that all the key-value pairs in the input object will be added as props */}
    </div>
  );
});

export default Input;
