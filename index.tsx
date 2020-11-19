import React from "react";
import { render } from "react-dom";

import App from "./src/App";
import { AuthProvider } from "./src/contexts/AuthContext";
import { InventoryProvider } from "./src/contexts/InventoryContext";
import "./index.scss";

render(
  <AuthProvider>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </AuthProvider>,
  document.getElementById("root")
);
