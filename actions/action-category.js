import * as types from "../constants/ActionTypes";
import { fetchCategoryListApi } from "../api/category";
import { setSideMenu } from "./action-menu";

export const fetchItemsForCategory = (shopId, updateSideMenu = false) => (dispatch) => {
    fetchCategoryListApi(shopId).then(res => {
        if (res.data) {
            dispatch(fetchCategories(res.data.data.menus));
            dispatch(addCurrentLength(res.data.data.total))
            if (updateSideMenu) {
                dispatch(setSideMenu(res.data.data.menus));
            }
        } else {
            dispatch(fetchCategories([]));
        }
    }).catch(err => dispatch(fetchCategories([])));
}

export const fetchCategories = (categories) => ({
    type: types.FETCH_CATEGORY,
    categories
});
export const addCurrentLength = (currentLength) => ({
    type: types.ADD_CURRENT_CATEGORY_LENGTH,
    currentLength
});
export const addPreviousLength = (previousLength) => ({
    type: types.ADD_PREVIOUS_CATEGORY_LENGTH,
    previousLength
});

