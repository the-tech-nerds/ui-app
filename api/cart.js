import axios from 'axios';
import { v4 as uuid } from 'uuid';
export const addItemToCartApi = (item) => {
    const id = uuid();
    console.log(id); 
    return item;
    // const model = {
    //     product_variance_Id: item.id,
    //     product_id: item.product_id
    // };
    // return axios.post(`/wishlist/create`, model)
    // .then(res => res)
    // .catch(err => err)
};

export const fetchCartApi = () => {
    return [];
    // return axios.get('/wishlist/list').then(res => res).catch(err => err);
}