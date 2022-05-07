import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payloadCreator } from "../utils/helper";
import userApi from "../api/user_api";
import { setAuthToken } from "../api/axios_client";
import Cookies from "js-cookie";

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

//admin

export const loginWithAdmin = createAsyncThunk(
  "user/loginAdmin",
  payloadCreator(userApi.loginAdmin)
);

export const authenticator = createAsyncThunk(
  "user/auth",
  payloadCreator(userApi.authenticator)
);

export const getInfoAdmin = createAsyncThunk(
  "user/getInfoAdmin",
  payloadCreator(userApi.getInfoAdmin)
);

export const sendCode = createAsyncThunk(
  "user/sendCode",
  payloadCreator(userApi.sendCode)
);

export const veryfy = createAsyncThunk(
  "user/veryfy_code",
  payloadCreator(userApi.veryfyCode)
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
      updateUser: false,
      sendCode: false,
      veryfy: false
    },

    phoneNumber: "",

    rejected: {
      forgetPassword: false
    }
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      const data = action.payload;

      console.log(action);

      state.phoneNumber = data;
    },
    resetPhoneNumber: (state) => {
      state.phoneNumber = "";
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.api.auth.login.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.api.auth.login.status = "fulfilled";
      state.api.auth.login.token = token;
      setAuthToken(token);
      Cookies.set("token", token);
    },
    [login.rejected]: (state) => {
      state.api.auth.login.status = "rejected";
      state.api.auth.login.token = "";
    },
    [loginWithAdmin.pending]: (state) => {
      state.api.auth.login.status = "pending";
    },
    [loginWithAdmin.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.api.auth.login.status = "fulfilled";
      state.api.auth.login.token = token;
      setAuthToken(token);
      Cookies.set("token", token);
    },
    [loginWithAdmin.rejected]: (state) => {
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
    [getInfoAdmin.pending]: (state) => {
      state.api.getInfo.status = "pending";
    },
    [getInfoAdmin.fulfilled]: (state, action) => {
      const info = action.payload;
      state.api.getInfo.status = "fulfilled";
      state.api.getInfo.me = info;
    },
    [getInfoAdmin.rejected]: (state) => {
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
    },

    [authenticator.pending]: (state) => {
      console.log("pending");
    },
    [authenticator.fulfilled]: (state) => {
      console.log("fulfilled");
    },
    [authenticator.rejected]: (state) => {
      console.log("rejected");
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

    [sendCode.pending]: (state) => {
      state.loading.sendCode = true;
    },
    [sendCode.fulfilled]: (state) => {
      state.loading.sendCode = false;
    },
    [sendCode.rejected]: (state) => {
      state.loading.sendCode = false;
    },

    [veryfy.pending]: (state) => {
      state.loading.veryfy = true;
    },
    [veryfy.fulfilled]: (state) => {
      state.loading.veryfy = false;
    },
    [veryfy.rejected]: (state) => {
      state.loading.veryfy = false;
    }
  }
});

export const { setPhoneNumber, resetPhoneNumber } = userSlice.actions;
export default userSlice.reducer;
