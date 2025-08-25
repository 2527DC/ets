import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import shiftReducer from "./features/shift/shiftSlice";
import vendorReducer from "./features/vendors/vendorSlice";
import driverReducer from "./features/drivers/driverSlice";
const store = configureStore({
  reducer: {
    shift:shiftReducer,
    auth: authReducer,
    user:userReducer,
    vendor: vendorReducer,
    driver: driverReducer,
  },
});

export default store;
