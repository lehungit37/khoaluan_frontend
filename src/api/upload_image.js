import axiosClient from "./axios_client";

const uploadImageApi = {
  uploadMultipleImage: (formData) => {
    return axiosClient.post("/images/multiple_upload", formData);
  },
  uploadSimpleImage: (formData) => {
    return axiosClient.post("/images/upload", formData);
  }
};

export default uploadImageApi;
