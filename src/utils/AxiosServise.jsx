import axios from "axios";
import { logout } from "../utils/logoutUtils";

const AxiosService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    if (token && config.authenticate) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401) {
        logout();
      } else {
        console.error(`Error ${response.status}:`, response.data);
        throw response.data;
      }
    } else {
      console.error("Network error or no response:", error);
      throw error;
    }
  }
);

export default AxiosService;
