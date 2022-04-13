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
  },
  changePassword: (password) => {
    return axiosClient.put("/user/change_password", password);
  },
  changeAvatar: (imageUrl) => {
    return axiosClient.post("/user/change_avatar", {
      imageUrl
    });
  },

  forgetPassword: (email) => {
    return axiosClient.post("/auth/forget_password", email);
  },

  changeInfoUser: ({ user, id }) => {
    return axiosClient.put(`/user/update_user/${id}`, user);
  }
};

export default userApi;
