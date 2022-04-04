import axiosClient from "./axios_client";

const postApi = {
  getDataByCategories: (id = "all") => {
    return axiosClient.get(`/post/get_post_by_categories/${id}`);
  },
  getInfoPost: (id) => {
    return axiosClient.get(`/post/get_post_item/${id}`);
  },
  getPostEdit: (id) => {
    return axiosClient.get(`/post/get_info_edit/${id}`);
  },

  getPostByUser: () => {
    return axiosClient.get("/post/get_post_by_user");
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
  }
};
export default postApi;
