import {
    ADD_TO_WISHLIST, FETCH_WISHLIST, REMOVE_FROM_WISHLIST
} from "../constants/ActionTypes";


const initialState = {
    list: []
};

export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_WISHLIST: 
            return {
                ...state,
                list: action.products,
            }

        case ADD_TO_WISHLIST:
            return {
                ...state,
                list: [...state.list, action.product],
            }
            
        case REMOVE_FROM_WISHLIST:
            return {
                list: state.list.filter(id => id !== action.product_id)
            }

        default:
    }
    return state;
}
