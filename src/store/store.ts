import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  devTools: import.meta.env.NODE_ENV !== "production",

  reducer: combineSlices(appSlice, authSlice),

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});
