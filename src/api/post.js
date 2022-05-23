import axiosClient from "./axios_client";

const postApi = {
  getAllPost: (param) => {
    return axiosClient.get(`/post/get_all_post?${param}`);
  },
  getDataByCategories: (id = "all") => {
    return axiosClient.get(`/post/get_post_by_categories/${id}`);
  },
  getInfoPost: (id) => {
    return axiosClient.get(`/post/get_post_item/${id}`);
  },
  getPostEdit: (id) => {
    return axiosClient.get(`/post/get_info_edit/${id}`);
  },

  getPostByUser: ({ id, param }) => {
    return axiosClient.get(`/post/get_post_by_user/${id}?${param}`);
  },
  displayPost: (id) => {
    return axiosClient.get(`post/display_post/${id}`);
  },
  hiddenPost: (id) => {
    return axiosClient.get(`/post/hidden_post/${id}`);
  },
  deletePost: (id) => {
    return axiosClient.delete(`/post/delete_post/${id}`);
  },

  updatePost: ({ dataSend, id }) => {
    return axiosClient.put(`/post/update_post/${id}`, dataSend);
  },

  getPostByAdmin: (param) => {
    return axiosClient.get(`/post/get_post_admin?${param}`);
  },

  getInfoDetailPost: (id) => {
    return axiosClient.get(`/post/get_detail_post/${id}`);
  }
};
export default postApi;
