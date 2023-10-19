import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./pages/App";
import DarkTheme from "./components/DarkTheme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DarkTheme>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkTheme>
  </React.StrictMode>
);
reportWebVitals();
