import axios from "axios";
import { AxiosDefaultResponse, Product } from "types";

export const fetchProductDetailsApi = (slug: string): Promise<AxiosDefaultResponse<Product>> => {
    return axios.get(`product-details/${slug}`).then(res => res).catch(err => err);
}