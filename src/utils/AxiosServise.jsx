import axios from "axios";
import { config } from "dotenv";

const AxiosServise = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosServise.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    if (token && config.authenticate)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosServise.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // console.log(error)
    const { response } = error;
    console.log(error);

    if (response.status === 401) {
      window.location.assign("/login");
    } else throw response.data;
  }
);
export default AxiosServise;
