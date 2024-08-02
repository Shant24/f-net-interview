import React from "react";
import ReactDOM from "react-dom/client";
import i18next from "i18next";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@/contexts/Localization";
import { DEFAULT_LANGUAGE, getLocalStorageLanguage } from "@/i18n";
import { store } from "@/store";
import Routes, { CustomRouter } from "@/components/Routes";
import PageLoading from "@/components/PageLoading";
import "@/assets/styles/index.scss";

const locale = getLocalStorageLanguage() || DEFAULT_LANGUAGE;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocalizationProvider i18n={i18next} locale={locale}>
    <React.Suspense fallback={<PageLoading />}>
      <CustomRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </CustomRouter>
    </React.Suspense>
  </LocalizationProvider>,
);
