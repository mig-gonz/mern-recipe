import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Index.css";

import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
