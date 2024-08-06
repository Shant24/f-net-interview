import { useCallback } from "react";
import type { IAuthState } from "@/store/slices/authSlice";
import { clearAuthData, selectAuthData, setAuthData } from "@/store/slices/authSlice";
import { sessionStorageManager } from "@/utils/storageManager";
import { STORAGE_KEYS } from "@/constants";
import { useAppDispatch, useAppSelector } from "./common";

export const loggedInData: IAuthState = {
  user: { data: {} },
  tokensData: { accessToken: "a", refreshToken: "r" },
};

export const useAuth = () => {
  const authData = useAppSelector(selectAuthData);

  const dispatch = useAppDispatch();

  const signIn = useCallback(
    (data: IAuthState) => {
      dispatch(setAuthData(data));

      sessionStorageManager.setItem(STORAGE_KEYS.USER, data.user);
      sessionStorageManager.setItem(STORAGE_KEYS.TOKEN, data.tokensData);
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    dispatch(clearAuthData());

    sessionStorageManager.removeItem(STORAGE_KEYS.USER);
    sessionStorageManager.removeItem(STORAGE_KEYS.TOKEN);
  }, [dispatch]);

  return {
    authData,
    isAuthorized: !!authData.user && !!authData.tokensData?.accessToken,
    signIn,
    signOut,
  };
};
