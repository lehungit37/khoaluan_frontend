import axiosClient from "./axios_client";

const permissionApi = {
  getPermission: (param) => {
    return axiosClient.get(`/permission/get_permission?${param}`);
  },
  updatePermission: ({ id, data }) => {
    return axiosClient.put(`/permission/${id}`, data);
  }
};

export default permissionApi;
