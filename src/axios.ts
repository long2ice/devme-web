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
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let response = error.response;
    if (response.status < 500) {
      toast.error(response.data.error);
    } else {
      toast.error("Server Error");
    }
    return Promise.reject(error);
  }
);
export default http;
