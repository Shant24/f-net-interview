// import { createSlice } from "@reduxjs/toolkit";
import { createAppSlice } from "./common";

const initialState = {};

export const appSlice = createAppSlice({
  name: "app",
  initialState,
  reducers: (_create) => ({}),
  selectors: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.actions;

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.selectors;

export default appSlice.reducer;
