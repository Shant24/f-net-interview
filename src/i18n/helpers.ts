import type { LangCode } from "./types";
import { DEFAULT_LANGUAGE, LANG_LOCAL_STORAGE_CODE } from "./constants";

export const getLocalStorageLanguage = () => localStorage.getItem(LANG_LOCAL_STORAGE_CODE) as LangCode | "";

export const removeLocalStorageLanguage = () => localStorage.removeItem(LANG_LOCAL_STORAGE_CODE);

export const setLocalStorageLanguage = (value: LangCode) => localStorage.setItem(LANG_LOCAL_STORAGE_CODE, value);

export const checkLanguageIsSupported = (language?: LangCode, supportedLanguages?: LangCode[]) => {
  if (!language) return false;
  if (!supportedLanguages) return true;
  return supportedLanguages.some((supportedLang) => language.toLowerCase().includes(supportedLang.toLowerCase()));
};

export const getLanguagesFromEnv = (): LangCode[] => {
  const langListString = import.meta.env.VITE_SUPPORTED_LANGUAGES?.trim();
  return langListString ? (langListString.split(",") as LangCode[]) : [DEFAULT_LANGUAGE];
};

export const getSupportedLanguages = getLanguagesFromEnv;
