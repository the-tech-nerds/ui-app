import axios from "axios";
import { AxiosDefaultResponse, Product } from "types";

export const fetchOfferDetailsApi = (slug: string): Promise<AxiosDefaultResponse<Product>> => {
    return axios.get(`/offer/offer-detail/${slug}`).then(res => res).catch(err => err);
}
