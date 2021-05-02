import {
    FETCH_CATEGORY
} from "../constants/ActionTypes";


const initialState = {
    list: {}
};

export default function categoryListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORY:
            return {
                ...state,
                list: action.categories,
            }
        default:
    }
    return state;
}
