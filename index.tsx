import React from "react";
import { render } from "react-dom";

import App from "./src/App";
import { connect } from "./src/api";
import { AuthProvider } from "./src/contexts/AuthContext";
import { InventoryProvider } from "./src/contexts/InventoryContext";
import "./index.scss";

connect();

render(
  <AuthProvider>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </AuthProvider>,
  document.getElementById("root")
);
