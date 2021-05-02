import { AxiosDefaultResponse, Shop } from "types";
import { fetchShopListApi } from "../api/shop";
import * as types from "../constants/ActionTypes";
import { AppDispatch } from '../store/index';


export const fetchShops = (shops: Shop[]) => ({
    type: types.FETCH_SHOPS,
    shops
});

export const selectShop = (shop: Shop) => (dispatch: AppDispatch) => {
    return dispatch({
        type: types.SELECT_SHOP,
        shop,
    })
}


export const fetchItemsForShop = () => (dispatch: AppDispatch) => {
    fetchShopListApi().then((res: AxiosDefaultResponse<Shop[]>) => {
        if (res.data) {
            dispatch(fetchShops(res.data.data));
            if (window.localStorage) {
                const { shops = null } = JSON.parse(localStorage.getItem('state'));
                if (shops && shops.current) {
                    const currentShop: Shop = shops.current;
                    selectShop(currentShop);
                }
            }
        } else {
            dispatch(fetchShops([]));
        }   
    }).catch(err => dispatch(fetchShops([])));
}
