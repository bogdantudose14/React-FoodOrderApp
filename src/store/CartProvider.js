import { useReducer } from 'react'; //managing a more complex state

import CartContext from './card-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // outside the component function because this function won't need anything from that
  // the last state snapshotof the state managed by the reducer
  // we have to return a new state snapshot

  if (action.TYPE === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // built-in function in JS which finds the index of an item in an array

    const existingCartItem = state.items[existingCartItemIndex]; // will only work if we already have an item =? otherwise it will return null;

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount, // the amount which was added by this action
      }; //object destructuring

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem; //overwrite the element on the found index;
    } else {
      //the item is added for the first time
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
    // concat unlike push returns a new Array
    // push edits the existing array
    // this is important because we want to update our state in an immutable way
    // we don t want to edit the old state snapshot because of the reference value thing in JS
    // we want to generate a brand new state object
  }

  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  ); // first argument: point at our reducer function (don't execute it)
  // second argument: we set an initial state (the default cart state)

  // useReducer returns an array with exactly two elements => we use array destructuring
  // ** the first element is a state snapshot
  // ** the second element is an action which allow you to dispatch to the reducer

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item }); // it is totally up to the developer what the action is (could be a number, a text, an object)
    //forward the item to the reducer
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
    //forward the id to the reducer
  };

  // a helper constant with all the fields we set up for the context itself

  // we use the cartState to construct this cartContext object;

  // const cartContext = {
  //   items: [],
  //   totalAmount: 0,
  //   addItem: addItemToCartHandler,
  //   removeItem: removeItemFromCartHandler,
  // };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider>{props.children}</CartContext.Provider>;
  //passing props.children allows us to wrap any components that should get access to this context
};

export default CartProvider;
