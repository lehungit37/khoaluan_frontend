import { combineReducers } from "redux";
import detailRoomSlice from "./detail_room_slice";

const reducer = combineReducers({
  detailRoomReducer: detailRoomSlice,
});

export default reducer;
