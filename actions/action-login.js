import { checkLoginApi } from "../api/login";
import * as types from '../constants/ActionTypes';

export const checkLogin = () => (dispatch) => {
    console.log('i am called');
    checkLoginApi().then(res => {
        if (res.data) {
            dispatch(changeLoginType(res.data.isLogin));
        }
    }).catch((e) => dispatch(changeLoginType(false)));
}


export const changeLoginType = (isLoggedIn) => ({
    type: types.LOGIN_TYPE_CHANGE,
    isLoggedIn,
})