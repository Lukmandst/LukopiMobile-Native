export const ADD_TO_CART1 = 'ADD_TO_CART1';
export const RESET_CART = 'RESET_CART';
export const ADD_TO_CART3 = 'ADD_TO_CART3';

export const addItemToCart1 = ({
  productid,
  size,
  product_image,
  product_price,
  product_name,
}) => {
  return dispatch => {
    dispatch({
      type: ADD_TO_CART1,
      payload: {
        productid,
        product_name,
        product_image,
        product_price,
        size,
      },
    });
  };
};
export const resetCart = () => {
  return dispatch => {
    dispatch({
      type: RESET_CART,
    });
  };
};
