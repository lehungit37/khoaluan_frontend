import axiosClient from "./axios_client";
const userApi = {
  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },

  loginAdmin: (data) => {
    return axiosClient.post("/auth/login/admin", data);
  },

  authenticator: (token) => {
    return axiosClient.post("/auth/authenticator", { token });
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

  changeInfoUser: ({ user, id }) => {
    return axiosClient.put(`/user/update_user/${id}`, user);
  },

  getInfoAdmin: () => {
    return axiosClient.get("/user/admin/get_info");
  },

  sendCode: (phoneNumber) => {
    return axiosClient.get(`/auth/send_code?phoneNumber=${phoneNumber}`);
  },

  veryfyCode: ({ phoneNumber, code }) => {
    return axiosClient.get(
      `/auth/veryfy?phoneNumber=${phoneNumber}&code=${code}`
    );
  },

  forgetPassword: (data) => {
    return axiosClient.post("/auth/forget_password", data);
  }
};

export default userApi;
