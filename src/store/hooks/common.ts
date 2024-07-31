/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector, useStore } from "react-redux";
import type { Action, Store } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/store/types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<Store<unknown, Action, RootState>>(); // TODO: check if this is needed
