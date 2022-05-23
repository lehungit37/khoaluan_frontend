import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionApi from "../api/permission_api";
import { payloadCreator } from "./../utils/helper";

export const getDataPermission = createAsyncThunk(
  "permission/getData",
  payloadCreator(permissionApi.getPermission)
);

export const updatePermission = createAsyncThunk(
  "permission/update",
  payloadCreator(permissionApi.updatePermission)
);
const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    permissionList: [],
    loading: {
      getData: false,
      update: false
    },
    totalData: 0,
    page: 1,
    limit: 15,
    infoEdit: {
      id: "",
      namePermission: ""
    }
  },
  reducers: {
    setInfoEdit: (state, action) => {
      const info = action.payload;
      state.infoEdit = info;
    },
    resetInfoEdit: (state, action) => {
      state.infoEdit = { id: "", namePermission: "" };
    }
  },
  extraReducers: {
    [getDataPermission.pending]: (state, action) => {
      state.loading.getData = true;
    },

    [getDataPermission.fulfilled]: (state, action) => {
      const { data, totalData } = action.payload;
      state.permissionList = data;
      state.totalData = totalData;
      state.loading.getData = false;
    },

    [getDataPermission.rejected]: (state, action) => {
      state.loading.getData = false;
    },
    [updatePermission.pending]: (state, action) => {
      state.loading.update = true;
    },

    [updatePermission.fulfilled]: (state, action) => {
      console.log(action);
      const { data, id } = action.meta.arg;
      const cloneData = [...state.permissionList];
      const index = cloneData?.findIndex((item) => item.id === id);
      cloneData.splice(index, 1, data);
      state.permissionList = cloneData;
      state.loading.update = false;
    },

    [updatePermission.rejected]: (state, action) => {
      state.loading.update = false;
    }
  }
});

export const { setInfoEdit, resetInfoEdit } = permissionSlice.actions;
export default permissionSlice.reducer;
