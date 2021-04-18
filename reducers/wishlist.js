import {
    ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST
} from "../constants/ActionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandle } from "share";
import FetchData from 'api/fetchdata'
const addWishlist = (item) => {
    const model = {
        product_variance_Id: item.id,
        product_id: item.product_id
    }
    axios.post(`/wishlist/create`, model).then(res => {
        toast.success('Add to wishlist');
        return res;

    }).catch(error => {
        const err = errorHandle.serverError(error.response.data.message);
        toast.error('Already have in wishlist');
    })
}

export default function wishlistReducer(state = {
    list: []
}, action) {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const variance = action.payload;
            addWishlist(variance);
            FetchData({
                url: '/wishlist/list', callback: (response, isSucess) => {
                    if (isSucess) {
                        return { ...state, list: response.data }
                    }
                }
            })
            return state;

        case REMOVE_FROM_WISHLIST:
            return {
                list: state.list.filter(id => id !== action.product_id)
            }

        default:
    }
    return state;
}
