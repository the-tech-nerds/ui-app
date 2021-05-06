import {
    SET_MENU,
} from "../constants/ActionTypes";


const initialState = {
    menu: []
};

export default function menuListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MENU:
            return {
                ...state,
                menu: action.menu,
            }
        default:
    }
    return state;
}
