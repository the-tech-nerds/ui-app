import axios from "axios";

export const fetchCategoryListApi = (shopId) => {
    return axios.get(`/category/${shopId}/all`).then(res => res).catch(err => err);
}
