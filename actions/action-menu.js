import * as types from "../constants/ActionTypes";

export const setSideMenu = (menu) => ({
    type: types.SET_MENU,
    menu,
});
