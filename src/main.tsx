import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import Routes, { CustomRouter } from "@/components/Routes";
import "@/assets/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </CustomRouter>
  </React.StrictMode>,
);
