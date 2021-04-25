import axios from 'axios';
import FetchData from './fetchdata';

export const addItemToWishlistApi = (item) => {

    const model = {
        product_variance_Id: item.id,
        product_id: item.product_id
    };
    return axios.post(`/wishlist/create`, model)
    .then(res => res)
    .catch(err => err)
};

export const fetchWishlistApi = () => {
    return axios.get('/wishlist/list').then(res => res).catch(err => err);
}