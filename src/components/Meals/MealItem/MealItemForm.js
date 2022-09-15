import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  //we use state only to control if the form is valid or not

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value; //always .current for refs created with useRef.value
    // the .value returns always a string => needs conversion
    const enteredAmountNumber = +enteredAmount; // a way of converting it to a nubmer => '+' in front of the variable

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* the onSubmit event on the form */}
      {/* a Javascript expression to be evaluated in which an object in passed (double curly braces)  */}
      <Input
        ref={amountInputRef} // this is a custom component and the ref prop doesn't work out of the box => we have to go to the component where
        //we want to receive refs => we import React from 'react' and wrap the component function with React.forwardRef()
        //and then we get the ref as a parameter which can now be set through the ref prop on your component
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
