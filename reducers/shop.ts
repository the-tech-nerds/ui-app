import { Shop } from "types";
import {
    FETCH_SHOPS,
    SELECT_SHOP,
} from "../constants/ActionTypes";


type ShopState = {
    list: Shop[],
    current: Shop | null;
}

const initialState: ShopState = {
    list: [],
    current: null,
};

export default function shopListReducer(state: ShopState = initialState, action: any) {
    switch (action.type) {
        case FETCH_SHOPS: 
            return {
                ...state,
                list: action.shops,
            }

        case SELECT_SHOP:
            return {
                ...state,
                current: action.shop,
            }

        default:
            return state;
    }
}
