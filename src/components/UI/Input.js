import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
      {/* the spread operator ensures that all the key-value pairs in the input object will be added as props */}
    </div>
  );
};

export default Input;
