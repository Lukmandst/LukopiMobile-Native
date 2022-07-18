import {ADD_TO_CART} from '../actions/cartActions';

const initialState = {
  cart: [],
};

const cartReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: {
          quantity: action.payload.quantity,
          delivery: action.payload.delivery,
          product_id: action.payload.productid,
          size: action.payload.size,
        },
      };

    default:
      return prevState;
  }
};

export default cartReducer;
