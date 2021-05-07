import { AxiosDefaultResponse, Shop } from "types";
import { fetchShopListApi } from "../api/shop";
import * as types from "../constants/ActionTypes";
import { AppDispatch } from '../store/index';


export const fetchShops = (shops: Shop[]) => ({
    type: types.FETCH_SHOPS,
    shops
});

export const selectShop = (shop: Shop) => {
    return ({
        type: types.SELECT_SHOP,
        shop,
    })
}

export const fetchItemsForShop = () => (dispatch: AppDispatch) => {
    fetchShopListApi().then((res: AxiosDefaultResponse<Shop[]>) => {
        if (res.data) {
            const shops: Shop[] = res.data.data;
            dispatch(fetchShops(shops));
            if (window.localStorage) {
                const { shops = null } = JSON.parse(localStorage.getItem('state'));
                if (shops && shops.current) {
                    const currentShop: Shop = shops.current;
                    dispatch(selectShop(currentShop));
                } else {
                    dispatch(selectShop(shops.list[0]))
                }
            } else {
                dispatch(selectShop(shops[0]));
            }
        } else {
            dispatch(fetchShops([]));
        }   
    }).catch(err => dispatch(fetchShops([])));
}
