import axios from "axios";
import { AxiosDefaultResponse, Product } from "types";

export const fetchUserAddressApi = (): Promise<AxiosDefaultResponse<Product>> => {
    return axios.get(`/address/user`).then(res => res).catch(err => err);
}
