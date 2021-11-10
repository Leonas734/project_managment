import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./content/AuthContent";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
