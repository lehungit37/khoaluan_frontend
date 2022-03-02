import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../utils/helper";
import menuApi from "../api/menu_api";
import { setAuthToken } from "../api/axios_client";

export const getMenu = createAsyncThunk(
  "get_menu",
  payloadCreator(menuApi.getMenu)
);
export const testAuthToken = createAsyncThunk(
  "menu/test",
  async (data, { rejectWithValue }) => {
    try {
      setAuthToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoicGhpaHVuZzQ5MjAwMEBnbWFpbC5jb20iLCJwYXNzd29yZCI6Ikh1bmdAMTIzIn0sImlhdCI6MTY0NTgxMDU2NCwiZXhwIjoxNjQ1ODE0MTY0fQ.BShr7vEfvLOU015fPKgcpyDM_ZlSg_ALRUk2jto-_lc"
      );
    } catch (error) {}
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    api: {
      getMenu: {
        status: "pending",
        categories: [],
      },
    },
  },
  reducer: {},
  extraReducers: {
    [getMenu.pending]: (state) => {
      state.api.getMenu.status = "pending";
    },
    [getMenu.fulfilled]: (state, action) => {
      const data = action.payload;
      state.api.getMenu.status = "fulfilled";
      state.api.getMenu.categories = data;
    },
    [getMenu.rejected]: (state, action) => {
      state.api.getMenu.status = "rejected";
    },
  },
});

export const {} = menuSlice.actions;
export default menuSlice.reducer;
