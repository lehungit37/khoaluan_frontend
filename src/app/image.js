import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payloadCreator } from "./../utils/helper";
import uploadImageApi from "./../api/upload_image";

export const uploadSimpleImage = createAsyncThunk(
  "image/uploadSimple",
  payloadCreator(uploadImageApi.uploadSimpleImage)
);
const imageSlice = createSlice({
  name: "image",
  initialState: {
    image: "",
    loading: {
      simple: false
    }
  },
  reducers: {},
  extraReducers: {
    [uploadSimpleImage.pending]: (state) => {
      state.loading.simple = true;
    },
    [uploadSimpleImage.fulfilled]: (state, action) => {
      state.image = action.payload?.url;
      state.loading.simple = false;
    },
    [uploadSimpleImage.rejected]: (state) => {
      state.loading.simple = false;
    }
  }
});

export const {} = imageSlice.actions;
export default imageSlice.reducer;
