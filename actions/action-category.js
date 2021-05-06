import * as types from "../constants/ActionTypes";
import {fetchCategoryListApi} from "../api/category";
import { setSideMenu } from "./action-menu";

export const fetchItemsForCategory = (shopId, updateSideMenu = false) => (dispatch) => {
    fetchCategoryListApi(shopId).then(res => {
        if (res.data) {
            dispatch(fetchCategories(res.data.data));
            if (updateSideMenu) {
                dispatch(setSideMenu(res.data.data));
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
