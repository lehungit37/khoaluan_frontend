import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../../../utils/helper";
import postApi from "./../../../api/post";
import newPostApi from "./../../../api/new_post_api";

export const getPostData = createAsyncThunk(
  "post/getdata",
  payloadCreator(postApi.getAllPost)
);

export const getDistrict = createAsyncThunk(
  "dashboard/getDistrict",
  payloadCreator(newPostApi.getAddress)
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: {
      getData: false
    },
    postData: [],
    priceSelected: "all",
    from: 0,
    to: 99999999999,
    districtId: "all",
    districtList: [{ code: "all", name: "Tất cả" }]
  },
  reducers: {
    changeLikePost: (state, action) => {
      const { id, status } = action.payload;
      const cloneData = [...state.postData];
      const index = cloneData?.findIndex((item) => item.id === id);

      cloneData[index].favorite = status;

      state.postData = cloneData;
    },

    changePricePost: (state, action) => {
      const { from, to, priceSelected } = action.payload;
      state.from = from;
      state.to = to;
      state.priceSelected = priceSelected;
    },

    changeDistrictId: (state, action) => {
      const { districtId } = action.payload;

      console.log(districtId);
      state.districtId = districtId;
    }
  },
  extraReducers: {
    [getPostData.pending]: (state) => {
      state.loading.getData = true;
    },
    [getPostData.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const favoritePostList = localStorage.getItem("favoritePost")?.split(",");
      const cloneData = [];

      data?.map((item) => {
        return cloneData.push({ ...item, favorite: false });
      });

      console.log(favoritePostList);

      favoritePostList?.map((item) => {
        const index = cloneData?.findIndex((post) => post.id === item);
        if (index !== -1) {
          cloneData[index].favorite = true;
        }
      });

      state.loading.getData = false;
      state.postData = cloneData;
    },
    [getPostData.rejected]: (state) => {
      state.loading.getData = false;
      state.postData = [];
    },

    [getDistrict.fulfilled]: (state, action) => {
      const { districts } = action.payload;
      districts.unshift({ code: "all", name: "Tất cả" });

      state.districtList = districts;
    }
  }
});

export const { changeLikePost, changePricePost, changeDistrictId } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
