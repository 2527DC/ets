import axios from "axios";

// Read the environment variable
const baseURL = import.meta.env.VITE_API_URL;

// Create Axios instance
export const API_CLIENT = axios.create({
  baseURL,
});

// Add request interceptor
API_CLIENT.interceptors.request.use(
  (config) => {
    console.log("🔼 Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
API_CLIENT.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
