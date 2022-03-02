import axios from "axios";
import queryString from "query-string";

let userToken = "";
let source = axios.CancelToken.source();
const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  config.cancelToken = source.token;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export const setAuthToken = (token) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = token;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

export const setUserToken = (userId) => {
  if (userId) {
    userToken = userId;
  } else {
    userToken = "";
  }
};
export { userToken };

export default axiosClient;
