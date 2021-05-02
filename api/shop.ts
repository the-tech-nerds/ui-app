import axios from "axios";
import { AxiosDefaultResponse, Shop } from "types";

export const fetchShopListApi = (): Promise<AxiosDefaultResponse<Shop>> => {
    return axios.get('/shops/all').then(res => res).catch(err => err);
}

const shop: null = null;
export default shop;