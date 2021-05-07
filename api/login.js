import axios from "axios";

export const checkLoginApi = () => axios.get(`/login/check`)
.then((res) => res)
.catch(e => e);

export const getUserDetails = () => axios.get('/user/userInfo')
.then((res) => res)
.catch(e => e)