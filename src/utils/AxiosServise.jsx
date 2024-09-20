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
    const { response } = error;

    if (response && response.status === 401) {
      console.log("Unauthorized access, redirecting to login...");
      if (typeof window !== "undefined") {
        window.location.assign("/login"); // Redirect to login
      }
    } else if (!response) {
      console.log(
        "No response received from the server. Possible network issue."
      );
    } else {
      console.log("Error: ", response.data || error.message);
      throw response.data || error.message;
    }
  }
);

export default AxiosServise;
