import type { Action, ThunkAction } from "@reduxjs/toolkit";
import type { store } from "./store";

export type RootStore = typeof store;

export type AppDispatch = RootStore["dispatch"];
export type RootState = ReturnType<RootStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
