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

export const register = createAsyncThunk(
  "user/register",
  payloadCreator(userApi.register)
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  payloadCreator(userApi.changePassword)
);

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  payloadCreator(userApi.changeAvatar)
);

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  payloadCreator(userApi.forgetPassword)
);

export const updateUser = createAsyncThunk(
  "user/updateInfo",
  payloadCreator(userApi.changeInfoUser)
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    api: {
      auth: {
        login: {
          status: "",
          token: ""
        },
        register: {
          status: ""
        }
      },
      getInfo: {
        status: "",
        me: {}
      }
    },

    loading: {
      changePassword: false,
      changeAvatar: false,
      forgetPassword: false,
      updateUser: false
    },

    rejected: {
      forgetPassword: false
    }
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
    [register.pending]: (state, action) => {
      state.api.auth.register.status = "pending";
    },
    [register.fulfilled]: (state, action) => {
      state.api.auth.register.status = "fulfilled";
    },
    [register.rejected]: (state, action) => {
      state.api.auth.register.status = "rejected";
    },
    [changePassword.pending]: (state, action) => {
      state.loading.changePassword = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      const { token } = action.payload;
      setAuthToken(token);
      state.loading.changePassword = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading.changePassword = false;
    },
    [changeAvatar.pending]: (state) => {
      state.loading.changeAvatar = true;
    },
    [changeAvatar.fulfilled]: (state, action) => {
      const { imageUrl } = action.payload;

      state.api.getInfo.me.imageUrl = imageUrl;
      state.loading.changeAvatar = false;
    },
    [changeAvatar.rejected]: (state) => {
      state.loading.changeAvatar = false;
    },
    [forgetPassword.pending]: (state) => {
      state.loading.forgetPassword = true;
      state.rejected.forgetPassword = false;
    },
    [forgetPassword.fulfilled]: (state) => {
      state.loading.forgetPassword = false;
    },
    [forgetPassword.rejected]: (state) => {
      state.loading.forgetPassword = false;
      state.rejected.forgetPassword = true;
    },

    [updateUser.pending]: (state) => {
      state.loading.updateUser = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      const user = action.meta.arg.user;
      state.api.getInfo.me = user;
      state.loading.updateUser = false;
    },
    [updateUser.rejected]: (state) => {
      state.loading.updateUser = false;
    }
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
