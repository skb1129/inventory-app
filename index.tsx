import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./src/App";
import { AuthProvider } from "./src/contexts/AuthContext";
import { InventoryProvider } from "./src/contexts/InventoryContext";
import "./index.scss";

render(
  <BrowserRouter>
    <AuthProvider>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
