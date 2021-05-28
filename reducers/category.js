import {
    FETCH_CATEGORY, ADD_CURRENT_CATEGORY_LENGTH,
    ADD_PREVIOUS_CATEGORY_LENGTH
} from "../constants/ActionTypes";


const initialState = {
    list: {}
};
const initialLength = {
    currentLength: 0,
    previousLength: 0,
}

export function categoryListReducer(state = initialState, action) {
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
export function TolatNumberCategoryReducer(state = initialLength, action) {
    switch (action.type) {
        case ADD_CURRENT_CATEGORY_LENGTH:
            return {
                ...state,
                currentLength: action.currentLength,
            }
        case ADD_PREVIOUS_CATEGORY_LENGTH:
            return {
                ...state,
                previousLength: action.previousLength,
            }
        default:
    }
    return state;
}
