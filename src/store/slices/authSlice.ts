import type { PayloadAction } from "@reduxjs/toolkit";
import { sessionStorageManager } from "@/utils/storageManager";
import { STORAGE_KEYS } from "@/constants";
import { createAppSlice } from "./common";

export interface IAuthState {
  user: { data: unknown } | null;
  tokensData: { accessToken: string; refreshToken: string } | null;
}

const initialState: IAuthState = {
  user: sessionStorageManager.getItem(STORAGE_KEYS.USER),
  tokensData: sessionStorageManager.getItem(STORAGE_KEYS.TOKEN),
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<IAuthState["user"]>) => {
      state.user = action.payload;
    }),
    setTokenData: create.reducer((state, action: PayloadAction<IAuthState["tokensData"]>) => {
      state.tokensData = action.payload;
    }),
    setAuthData: create.reducer((state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.tokensData = action.payload.tokensData;
    }),
  }),
  selectors: {
    selectUser: (state) => state.user,
    selectTokenData: (state) => state.tokensData,
    selectAuthData: (state) => state,
  },
});

export const { setUser, setTokenData, setAuthData } = authSlice.actions;

export const { selectUser, selectTokenData, selectAuthData } = authSlice.selectors;

export default authSlice.reducer;
