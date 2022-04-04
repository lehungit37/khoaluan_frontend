import axiosClient from "./axios_client";

const newPostApi = {
  getAddress: () => {
    return axiosClient.get("/place/city");
  },
  getLocation: ({ address }) => {
    return axiosClient.post("/place/geocoder", { address });
  },
  addPost: (dataSend) => {
    return axiosClient.post("/post/add_post", dataSend);
  }
};

export default newPostApi;
