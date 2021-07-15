import axios from "axios";
import { AxiosDefaultResponse, Offer } from "types";

export const fetchOfferDetailsApi = (slug: string): Promise<AxiosDefaultResponse<Offer>> => {
    return axios.get(`/offer/offer-detail/${slug}`).then(res => res).catch(err => err);
}
