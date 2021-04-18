export const addWishlistApi = (item) => {
    const model = {
        product_variance_Id: item.id,
        product_id: item.product_id
    }
    FetchData({
        url: '/wishlist/list', callback: (response, isSucess) => {
            if (isSucess) {
                return { ...state, list: response.data }
            }
        }
    })
}