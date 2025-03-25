import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userSlice";
import yourReducer from "./yourReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    your: yourReducer
  }
});

export default store;
