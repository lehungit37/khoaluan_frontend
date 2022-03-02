import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payloadCreator } from "../utils/helper";
import userApi from "../api/user_api";
import { setAuthToken } from "../api/axios_client";

export const login = createAsyncThunk(
  "user/login",
  payloadCreator(userApi.login)
);

export const getInfo = createAsyncThunk(
  "user/getInfo",
  payloadCreator(userApi.getInfo)
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    api: {
      auth: {
        login: {
          status: "",
          token: "",
        },
      },
      getInfo: {
        status: "",
        me: {},
      },
    },
  },
  reducer: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.api.auth.login.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.api.auth.login.status = "fulfilled";
      state.api.auth.login.token = token;
      setAuthToken(token);
    },
    [login.rejected]: (state) => {
      state.api.auth.login.status = "rejected";
      state.api.auth.login.token = "";
    },
    [getInfo.pending]: (state) => {
      state.api.getInfo.status = "pending";
    },
    [getInfo.fulfilled]: (state, action) => {
      const info = action.payload;
      state.api.getInfo.status = "fulfilled";
      state.api.getInfo.me = info;
    },
    [getInfo.rejected]: (state) => {
      state.api.getInfo.status = "rejected";
      state.api.getInfo.me = {};
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
