import axios from "axios";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    toast.error(error.response.data.error);
    return Promise.reject(error);
  }
);
export default http;
