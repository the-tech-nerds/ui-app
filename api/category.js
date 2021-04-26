import axios from "axios";

export const fetchCategoryListApi = () => {
    return axios.get('/category/all').then(res => res).catch(err => err);
}
