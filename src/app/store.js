import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root_reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
