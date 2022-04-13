import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    dialogProps: null,
    dialogType: null
  },
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.dialogProps = action.payload.dialogProps;
      state.dialogType = action.payload.dialogType;
    },
    closeModal: (state, action) => {
      state.open = false;
      state.dialogProps = null;
      state.dialogType = null;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
