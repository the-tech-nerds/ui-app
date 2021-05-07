import { checkLoginApi, getUserDetails } from "../api/login";
import * as types from '../constants/ActionTypes';

export const checkLogin = () => (dispatch) => {
    checkLoginApi().then(res => {
        if (res.data) {
            dispatch(changeLoginType(res.data.isLogin));
        }
    }).catch((e) => dispatch(changeLoginType(false)));
}

export const fetchUserDetails = () => (dispatch) => {
    getUserDetails().then(res => {  
        if (res.data) {
            dispatch(fetchUser(res.data.data));
        }
    }).catch((e) => dispatch(fetchUser(null)));
}


export const changeLoginType = (isLoggedIn) => ({
    type: types.LOGIN_TYPE_CHANGE,
    isLoggedIn,
})

export const fetchUser = (user) => ({
    type: types.USER_DETAILS_FETCHED,
    user,
})