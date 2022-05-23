import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newPostApi from "../../../api/new_post_api";
import uploadImageApi from "../../../api/upload_image";
import { payloadCreator } from "./../../../utils/helper";
import menuApi from "./../../../api/menu_api";

export const getAddress = createAsyncThunk(
  "newPost/getAddress",
  payloadCreator(newPostApi.getAddress)
);

export const getRootLocation = createAsyncThunk(
  "newPost/getLocation",
  payloadCreator(newPostApi.getLocation)
);

export const uploadImage = createAsyncThunk(
  "newPost/uploadImage",
  payloadCreator(uploadImageApi.uploadMultipleImage)
);

export const getCategories = createAsyncThunk(
  "newPost/getCategories",
  menuApi.getMenu
);

export const addPost = createAsyncThunk(
  "post/add_post",
  payloadCreator(newPostApi.addPost)
);

const initFormValue = {
  cityId: "",
  districtId: "",
  street: "",
  address: "",
  categoryId: "",
  title: "",
  description: "",
  infoConnect: "",
  price: null,
  objectId: "all"
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState: {
    formDataValue: initFormValue,
    loadingNewPost: {
      getAddress: false,
      getLocation: false,
      addPost: false
    },
    rejected: {
      getAddress: false
    },
    address: {
      city: [],
      district: []
    },
    imagesLink: [],
    rootLocation: "",
    categories: []
  },
  reducers: {
    resetImagesLink: (state) => {
      state.imagesLink = [];
    }
  },
  extraReducers: {
    [getAddress.pending]: (state) => {
      state.loadingNewPost.getAddress = true;
      state.rejected.getAddress = false;
    },
    [getAddress.fulfilled]: (state, action) => {
      const data = action.payload;
      state.address = data;

      state.loadingNewPost.getAddress = false;
      state.rejected.getAddress = false;
    },
    [getAddress.rejected]: (state) => {
      state.loadingNewPost.getAddress = false;
      state.rejected.getAddress = true;
    },
    [getRootLocation.pending]: (state) => {
      state.loadingNewPost.getLocation = true;
    },
    [getRootLocation.fulfilled]: (state, action) => {
      const data = action.payload;
      state.rootLocation = data;

      state.loadingNewPost.getLocation = false;
    },
    [getRootLocation.rejected]: (state) => {
      state.loadingNewPost.getLocation = false;
    },
    [uploadImage.pending]: (state) => {},
    [uploadImage.fulfilled]: (state, action) => {
      const data = action.payload;
      state.imagesLink = data;
    },
    [uploadImage.rejected]: (state) => {},
    [getCategories.pending]: (state) => {
      console.log("pending");
    },
    [getCategories.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.categories = data;
    },
    [getCategories.pending]: (state) => {
      console.log("pending");
    },
    [addPost.pending]: (state) => {
      state.loadingNewPost.addPost = true;
    },
    [addPost.fulfilled]: (state) => {
      state.loadingNewPost.addPost = false;
    },
    [addPost.rejected]: (state) => {
      state.loadingNewPost.addPost = false;
    }
  }
});

export const { resetImagesLink } = newPostSlice.actions;
export default newPostSlice.reducer;
