//external imports
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

//internal imports
import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";

//configure app store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// export app store
export default store;
