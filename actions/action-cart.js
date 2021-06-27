import { toast } from "react-toastify";
// import { addItemToCartApi } from '../api/cart';
import * as types from '../constants/ActionTypes';

export const addItemToCart = (product) => (dispatch) => {
    dispatch({
        type: types.ADD_TO_CART,
        product,
    })
}

export const incrementCartProductQTY = (productId) => (dispatch) => {
    dispatch({
        type: types.INCREMENT_QTY,
        productId
    })
}

export const decrementCartProductQTY = (productId) => (dispatch) => {
    dispatch({
        type: types.DECREMENT_QTY,
        productId
    })
}


export const deleteItemFromCart = (product_id) => (dispatch) => {
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id,
    })
}
