import {
    LOGIN_TYPE_CHANGE,
    USER_DETAILS_FETCHED
} from "../constants/ActionTypes";


const initialState = {
    isLoggedIn: false,
    user: null,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_TYPE_CHANGE:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            }

        case USER_DETAILS_FETCHED:
            return {
                ...state,
                user: action.user,
            }

        default:
    }
    return state;
}
