import * as types from "../constants/ActionTypes";
import {fetchCategoryListApi} from "../api/category";

export const fetchItemsForCategory = () => (dispatch) => {
    fetchCategoryListApi().then(res => {
        if (res.data) {
            dispatch(fetchCategories(res.data.data));
        } else {
            dispatch(fetchCategories({}));
        }
    }).catch(err => dispatch(fetchCategories({})));
}

export const fetchCategories = (categories) => ({
    type: types.FETCH_CATEGORY,
    categories
});
