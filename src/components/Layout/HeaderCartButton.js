import { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/card-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    // the currentNumber is a value which is carried on across executions => initially it is 0
    // after the first execution of the function, it will be the result returned in the previous execution;

    return currentNumber + item.amount;
  }, 0);

  //reduce allows us to transform an array of data into a single value;
  //reduce takes two arguments (a function and a starting value)

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
