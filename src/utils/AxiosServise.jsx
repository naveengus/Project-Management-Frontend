import axios from "axios";
import { logout } from "../utils/logoutUtils"; // Import the logout function

// Create an axios instance
const AxiosService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // VITE environment variable for base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to handle token-based authentication
AxiosService.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    if (token && config.authenticate) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers if present
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle responses and errors
AxiosService.interceptors.response.use(
  (response) => {
    console.log(response); // Optional: Log the response
    return response.data; // Return only the response data
  },
  (error) => {
    const { response } = error;

    // Handle specific errors like 401 (Unauthorized)
    if (response) {
      if (response.status === 401) {
        logout(); // Call the logout utility function when status is 401
      } else {
        throw response.data; // Throw any other errors
      }
    } else {
      console.error("Network error or no response");
      throw error; // Handle network errors or lack of response
    }
  }
);

export default AxiosService;
