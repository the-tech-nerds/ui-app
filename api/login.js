import axios from "axios";

export const checkLoginApi = () => axios.get(`/login/check`)
.then((res) => res)
.catch(e => e);