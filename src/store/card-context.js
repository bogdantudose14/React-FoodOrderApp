import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {}, //functions that will allow the update of the Context data
  removeItem: (id) => {},
});

export default CartContext;
