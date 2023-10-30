import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./pages/App";
import { ThemeProvider } from "./context/ThemeProvider";
import { QueryProvider } from "./lib/ReactQuery/QueryProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
