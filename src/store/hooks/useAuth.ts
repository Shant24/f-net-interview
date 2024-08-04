import { useCallback } from "react";
import { STORAGE_KEYS } from "@/constants";
import { sessionStorageManager } from "@/utils/storageManager";
import { selectAuthData, setAuthData } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./common";

const loggedInData = {
  user: { data: {} },
  tokensData: { accessToken: "a", refreshToken: "r" },
};

const loggedOutData = {
  user: null,
  tokensData: null,
};

export const useAuth = () => {
  const authData = useAppSelector(selectAuthData);

  const dispatch = useAppDispatch();

  const signIn = useCallback(() => {
    dispatch(setAuthData(loggedInData));

    sessionStorageManager.setItem(STORAGE_KEYS.USER, loggedInData.user);
    sessionStorageManager.setItem(STORAGE_KEYS.TOKEN, loggedInData.tokensData);
  }, [dispatch]);

  const signOut = useCallback(() => {
    dispatch(setAuthData(loggedOutData));

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
