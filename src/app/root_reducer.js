import { combineReducers } from "redux";
import detailRoomSlice from "./detail_room_slice";
import menuSlice from "./menu_slice";
import userSlice from "./user_slice";
import newPostSlice from "./../features/user_management/new_post/new_post_slice";
import dashboardSlice from "../features/user/dashboard/dashboard_slice";
import postSlice from "./post_slice";
import modalSlice from "./modal_slice";
import imageSlice from "./image";
import categorySlice from "../features/admin/categories_management/category_slice";
import permissionSlice from "./permission_slice";

const reducer = combineReducers({
  detailRoomReducer: detailRoomSlice,
  menuReducer: menuSlice,
  userReducer: userSlice,
  newPostReducer: newPostSlice,
  dashboardReducer: dashboardSlice,
  postReducer: postSlice,
  modalReducer: modalSlice,
  imageReducer: imageSlice,
  categoryReducer: categorySlice,
  permissionReducer: permissionSlice
});

export default reducer;
