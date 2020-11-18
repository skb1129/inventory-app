import React from "react";
import { render, cleanup } from "@testing-library/react";

import App from "../src/App";

afterAll(cleanup);

const { queryByTestId } = render(<App />);

test("App: renders correctly", () => {
  expect(queryByTestId("app")).toBeTruthy();
});
