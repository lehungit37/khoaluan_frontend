import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../utils/helper";
import postApi from "./../api/post";

export const getInfoPost = createAsyncThunk(
  "post/getInfo",
  payloadCreator(postApi.getInfoPost)
);

export const getPostByUser = createAsyncThunk(
  "post/getPostByUser",
  payloadCreator(postApi.getPostByUser)
);

export const displayPost = createAsyncThunk(
  "post/displayPost",
  payloadCreator(postApi.displayPost)
);
export const hiddenPost = createAsyncThunk(
  "post/hiddenPost",
  payloadCreator(postApi.hiddenPost)
);

export const deletePost = createAsyncThunk(
  "post/delete",
  payloadCreator(postApi.deletePost)
);
export const deletePostAdmin = createAsyncThunk(
  "post/deleteAdmin",
  payloadCreator(postApi.deletePost)
);

export const getInfoPostEdit = createAsyncThunk(
  "post/getInfoEdit",
  payloadCreator(postApi.getPostEdit)
);

export const updatePost = createAsyncThunk(
  "post/update",
  payloadCreator(postApi.updatePost)
);

export const getPostByAdmin = createAsyncThunk(
  "post/getPostAdmin",
  payloadCreator(postApi.getPostByAdmin)
);

export const displayPostAdmin = createAsyncThunk(
  "post/displayPostAdmin",
  payloadCreator(postApi.displayPost)
);
export const hiddenPostAdmin = createAsyncThunk(
  "post/hiddenPostAdmin",
  payloadCreator(postApi.hiddenPost)
);

export const getInfoDetailPost = createAsyncThunk(
  "post/getInfoDetail",
  payloadCreator(postApi.getInfoDetailPost)
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    infoPost: {},
    infoAuthorPost: {},
    loading: {
      getInfo: false,
      getPostByUser: false,
      displayPost: false,
      hiddenPost: false,
      deletePost: false,
      updatePost: false,
      getPostByAdmin: false,

      displayPost: false,
      hiddenPost: false,
      getInfoDetailPost: false
    },
    lastestPost: [],
    relatedPost: [],
    reject: {
      getInfo: false,
      getPostByUser: false
    },
    postData: [],
    postDataAdmin: [],
    totalData: 0,
    totalDataAdmin: 0,
    infoDetailPost: {},
    page: 1,
    limit: 15,
    filterByPrice: {
      id: "all",
      name: "Tất cả",
      from: 0,
      to: 99999999999
    }
  },
  reducers: {
    changePagePost: (state, action) => {
      const page = action.payload;
      state.page = page;
    },
    resetInfoDetailPost: (state, action) => {
      state.infoDetailPost = {};
    }
  },
  extraReducers: {
    [getInfoPost.pending]: (state) => {
      state.loading.getInfo = true;
      state.reject.getInfo = false;
    },
    [getInfoPost.fulfilled]: (state, action) => {
      const { infoPost, infoAuthPost, lastestPost, relatedPost } =
        action.payload;
      state.infoPost = infoPost;
      state.infoAuthorPost = infoAuthPost;
      state.loading.getInfo = false;
      state.lastestPost = lastestPost;
      state.relatedPost = relatedPost;
      state.reject.getInfo = false;
    },
    [getInfoPost.rejected]: (state) => {
      state.loading.getInfo = false;
      state.reject.getInfo = true;
    },
    [getPostByUser.pending]: (state) => {
      state.loading.getPostByUser = true;
      state.reject.getPostByUser = false;
    },
    [getPostByUser.fulfilled]: (state, action) => {
      const { postData, totalData } = action.payload;
      state.postData = postData;
      state.totalData = totalData;
      state.loading.getPostByUser = false;
      state.reject.getPostByUser = false;
    },
    [getPostByUser.rejected]: (state) => {
      state.loading.getPostByUser = false;
      state.reject.getPostByUser = true;
    },
    [displayPost.pending]: (state) => {
      state.loading.displayPost = true;
    },
    [displayPost.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const indexPost = state.postData?.findIndex((post) => post.id === id);
      state.postData[indexPost].status = true;
      state.loading.displayPost = false;
    },
    [displayPost.rejected]: (state) => {
      state.loading.displayPost = false;
    },
    [hiddenPost.pending]: (state) => {
      state.loading.hiddenPost = true;
    },
    [hiddenPost.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const indexPost = state.postData?.findIndex((post) => post.id === id);
      state.postData[indexPost].status = false;
      state.loading.hiddenPost = false;
    },
    [hiddenPost.rejected]: (state) => {
      state.loading.hiddenPost = false;
    },
    [deletePost.pending]: (state) => {
      state.loading.deletePost = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const cloneData = [...state.postData];
      const indexPost = cloneData?.findIndex((post) => post.id === id);
      cloneData.splice(indexPost, 1);
      state.postData = cloneData;
      state.loading.deletePost = false;
    },
    [deletePost.rejected]: (state) => {
      state.loading.deletePost = false;
    },

    [deletePostAdmin.pending]: (state) => {
      state.loading.deletePost = true;
    },
    [deletePostAdmin.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const cloneData = [...state.postDataAdmin];
      const indexPost = cloneData?.findIndex((post) => post.id === id);
      cloneData.splice(indexPost, 1);
      state.postDataAdmin = cloneData;
      state.loading.deletePost = false;
    },
    [deletePostAdmin.rejected]: (state) => {
      state.loading.deletePost = false;
    },
    [getInfoPostEdit.pending]: (state) => {
      state.loading.getInfo = true;
    },
    [getInfoPostEdit.fulfilled]: (state, action) => {
      state.loading.getInfo = false;

      state.infoPost = action.payload;
    },
    [getInfoPostEdit.rejected]: (state) => {
      state.loading.getInfo = false;
    },
    [updatePost.pending]: (state) => {
      state.loading.updatePost = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading.updatePost = false;
    },
    [updatePost.rejected]: (state) => {
      state.loading.updatePost = false;
    },

    [getPostByAdmin.pending]: (state) => {
      state.loading.getPostByAdmin = true;
    },
    [getPostByAdmin.fulfilled]: (state, action) => {
      const { data, totalData } = action.payload;

      state.postDataAdmin = data;
      state.totalDataAdmin = totalData;
      state.loading.getPostByAdmin = false;
    },

    [displayPostAdmin.pending]: (state) => {
      state.loading.displayPostAdmin = true;
    },
    [displayPostAdmin.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const indexPost = state.postDataAdmin?.findIndex(
        (post) => post.id === id
      );
      state.postDataAdmin[indexPost].status = true;
      state.loading.displayPostAdmin = false;
    },
    [displayPostAdmin.rejected]: (state) => {
      state.loading.displayPostAdmin = false;
    },
    [hiddenPostAdmin.pending]: (state) => {
      state.loading.hiddenPostAdmin = true;
    },
    [hiddenPostAdmin.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      const indexPost = state.postDataAdmin?.findIndex(
        (post) => post.id === id
      );
      state.postDataAdmin[indexPost].status = false;
      state.loading.hiddenPostAdmin = false;
    },
    [hiddenPostAdmin.rejected]: (state) => {
      state.loading.hiddenPostAdmin = false;
    },

    [getInfoDetailPost.pending]: (state, action) => {
      state.loading.getInfoDetailPost = true;
    },
    [getInfoDetailPost.fulfilled]: (state, action) => {
      const { name, infoPost } = action.payload;
      console.log({ name, infoPost });
      infoPost.name = name;

      console.log(infoPost);
      state.infoDetailPost = infoPost;
      state.loading.getInfoDetailPost = false;
    },
    [getInfoDetailPost.rejected]: (state, action) => {
      state.loading.getInfoDetailPost = false;
    }
  }
});

export const { changePagePost, resetInfoDetailPost } = postSlice.actions;
export default postSlice.reducer;
