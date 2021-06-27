import axios from "axios";
import _products from "./data.json";
import { AxiosDefaultResponse, Shop } from "types";
const TIMEOUT = 100

export const fetchShopListApi = (): Promise<AxiosDefaultResponse<Shop>> => {
  return axios
    .get("/shops/all")
    .then((res) => res)
    .catch((err) => err);
};

export const getProducts = (cb: any, timeout: any) =>
  setTimeout(() => cb(_products), timeout || TIMEOUT);
export const buyProducts = (payload: any, cb: any, timeout: any) =>
  setTimeout(() => cb(), timeout || TIMEOUT);

const shop: null = null;
export default shop;
