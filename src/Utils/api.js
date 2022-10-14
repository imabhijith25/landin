import axios from "axios";
import { logout } from "./logout";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status == 401) {
            logout();
            return;
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };
