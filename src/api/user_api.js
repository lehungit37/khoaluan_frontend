import axiosClient from "./axios_client";
const userApi = {
  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },
  getInfo: () => {
    return axiosClient.get("/user/get_info");
  },
};

export default userApi;
