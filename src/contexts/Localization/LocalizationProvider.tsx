import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import type { i18n } from "i18next";
import type { LangCode } from "@/i18n";
import type { LocalizationState } from "./LocalizationContext";
import { I18nextProvider } from "react-i18next";
import {
  checkLanguageIsSupported,
  DEFAULT_LANGUAGE,
  getSupportedLanguages,
  initI18n,
  setLocalStorageLanguage,
} from "@/i18n";
import LocalizationContext from "./LocalizationContext";

interface Props {
  i18n: i18n;
  locale: LangCode;
}

const LocalizationProvider: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, i18n, locale } = props;
  const [localizationState, setLocalizationState] = useState<LocalizationState>("idle");

  const changeLanguage = useCallback(
    (newLocale: LangCode) => {
      setLocalizationState("pending");
      setLocalStorageLanguage(newLocale);
      i18n.changeLanguage(newLocale, (error) => {
        if (error) {
          setLocalizationState("error");
        } else {
          setLocalizationState("success");
        }
      });
    },
    [i18n],
  );

  useEffect(() => {
    const supportedLanguages = getSupportedLanguages();
    const isSupported = checkLanguageIsSupported(locale, supportedLanguages);
    const newLocale = isSupported ? locale : DEFAULT_LANGUAGE;

    initI18n(newLocale);
    changeLanguage(newLocale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <LocalizationContext.Provider value={{ localizationState, changeLanguage }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
