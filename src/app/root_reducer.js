import { combineReducers } from "redux";
import detailRoomSlice from "./detail_room_slice";
import menuSlice from "./menu_slice";
import userSlice from "./user_slice";

const reducer = combineReducers({
  detailRoomReducer: detailRoomSlice,
  menuReducer: menuSlice,
  userReducer: userSlice,
});

export default reducer;
