import axiosClient from "./axios_client";
const userApi = {
  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },
  getInfo: () => {
    return axiosClient.get("/user/get_info");
  },
  register: (data) => {
    return axiosClient.post("/auth/register", data);
  }
};

export default userApi;
