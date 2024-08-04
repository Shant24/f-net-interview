import React from "react";
import ReactDOM from "react-dom/client";
import i18next from "i18next";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@/contexts/Localization";
import { DEFAULT_LANGUAGE, getLocalStorageLanguage } from "@/i18n";
import { store } from "@/store";
import Routes, { CustomRouter } from "@/routes";
import PageLoading from "@/components/PageLoading";
import "@/assets/styles/index.scss";

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const locale = getLocalStorageLanguage() || DEFAULT_LANGUAGE;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocalizationProvider i18n={i18next} locale={locale}>
    <CustomRouter>
      <Provider store={store}>
        <React.Suspense fallback={<PageLoading />}>
          <Routes />
        </React.Suspense>
      </Provider>
    </CustomRouter>
  </LocalizationProvider>,
);
