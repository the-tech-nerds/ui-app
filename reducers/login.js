import {
    LOGIN_TYPE_CHANGE
} from "../constants/ActionTypes";


const initialState = {
    isLoggedIn: false,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_TYPE_CHANGE:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            }

        default:
    }
    return state;
}
