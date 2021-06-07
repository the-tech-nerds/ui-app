import { toast } from "react-toastify";
import { addItemToWishlistApi, fetchWishlistApi } from '../api/wishlist';
import * as types from '../constants/ActionTypes';

//it seems that I should probably use this as the basis for "Wishlist"
export const addItemToWishlist = (product) => (dispatch) => {
    addItemToWishlistApi(product).then((res) => {
        if (res.data && res.status === 200 || res.status === 201) {
            dispatch(fetchItemsForWishlist())
            toast.success('Added to wishlist');
            return;
        } else {
            toast.error("Already in wishlist");
            return;
        }
    }).catch(err => {
        toast.error("Error adding in wishlist!");
    })
}

export const fetchItemsForWishlist = () => (dispatch) => {
    fetchWishlistApi().then(res => {
        if (res.data) {
            dispatch(fetchWishlist(res.data.data));
        } else {
            dispatch(fetchWishlist([]));
        }
    }).catch(err => dispatch(fetchWishlist([])));
}

export const fetchWishlist = (products) => ({
    type: types.FETCH_WISHLIST,
    products
});


export const addToWishlist = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});


export const removeFromWishlist = product_id => (dispatch) => {
    toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};
