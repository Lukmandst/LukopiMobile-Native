import {ADD_TO_CART1, RESET_CART} from '../actions/cartActions';

const initialState = {
  cart: [],
};

const cartReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART1:
      return {
        cart: {
          product_id: action.payload.productid,
          size: action.payload.size,
          product_name: action.payload.product_name,
          product_image: action.payload.product_image,
          product_price: action.payload.product_price,
        },
      };
    case RESET_CART:
      return {
        initialState,
      };

    default:
      return prevState;
  }
};

export default cartReducer;
