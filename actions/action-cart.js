import { toast } from "react-toastify";
// import { addItemToCartApi } from '../api/cart';
import * as types from '../constants/ActionTypes';

//it seems that I should probably use this as the basis for "Wishlist"
export const addItemToCart = (product) => (dispatch) => {
    // addItemToCartApi(product).then((res) => {
    //     console.log(res);
    //     // if (res.data && res.status === 200 || res.status === 201) {
    //     //     dispatch(fetchItemsForWishlist())
    //     //     toast.success('Added to cart');
    //     //     return;
    //     // } else {
    //     //     toast.error("Already in cart");
    //     //     return;
    //     // }
    // }).catch(err => {
    //     toast.error("Error adding in cart!");
    // })

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
