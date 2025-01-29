import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json"
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getErrorMessage = (msg: unknown): string => {
  console.log("MM", msg);
  if (axios.isAxiosError(msg) && msg.response) {
    return msg.response.data.message || msg.response.data.error;
  }
  return 'An unknown error occurred';
};

export { axiosInstance, getErrorMessage };
