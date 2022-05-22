import axiosClient from "./axios_client";
const categoryApi = {
  getAllData: (param) => {
    return axiosClient.get(`/categories/get_all_by_admin?${param}`);
  },
  addCategory: ({ nameCategories }) => {
    return axiosClient.post("/categories/add", { nameCategories });
  },
  updateCategory: ({ nameCategories, id }) => {
    return axiosClient.put(`/categories/${id}`, { nameCategories });
  },
  deleteCategory: (id) => {
    return axiosClient.delete(`/categories/${id}`);
  }
};
export default categoryApi;
