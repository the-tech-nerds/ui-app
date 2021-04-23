// const addToWishList = (product) => {
//     dispatch({
//         type: ADD_TO_WISHLIST,
//         product
//     });
// };

//it seems that I should probably use this as the basis for "Wishlist"
export const addItemToWishlist = (product) => (dispatch) => {
    addWishlistApi(product).then(res => {
        if (res.status === 200) {
            dispatch(addToWishlist(product))
        }
    }).catch(err => {

    })

}

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
