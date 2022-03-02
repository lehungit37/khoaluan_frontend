import axiosClient from "./axios_client";
const menuApi = {
  getMenu: () => {
    return axiosClient.get("/categories/get_all");
  },
};

export default menuApi;
