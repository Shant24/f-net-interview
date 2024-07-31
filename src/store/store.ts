import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";

export const store = configureStore({
  devTools: import.meta.env.NODE_ENV !== "production",
  reducer: combineSlices(appSlice),
});
