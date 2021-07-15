import axios from "axios";
import { Address, AxiosDefaultResponse } from "types";

export const fetchUserAddressApi = (): Promise<AxiosDefaultResponse<Address>> => {
    return axios.get(`/address/user`).then(res => res).catch(err => err);
}
