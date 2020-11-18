import React from "react";

import Table from "./components/table/Table";
import { Header, Item } from "./components/table/models";

import classes from "./App.scss";

const mockData = {
  headers: [
    { id: "name", text: "Name", size: "auto" },
    { id: "price", text: "Price (₹)", size: "md" },
    { id: "quantity", text: "Quantity (NOS)", size: "md" },
  ] as Header[],
  items: [
    { id: "1", name: "Chips", price: 20, quantity: 100 },
    { id: "2", name: "Chocolates", price: 100, quantity: 50 },
    { id: "3", name: "Dettol", price: 10, quantity: 1000 },
    { id: "4", name: "Maggi", price: 80, quantity: 10 },
  ] as Item[],
};

function App(): JSX.Element {
  return (
    <div data-testid="app" className={classes.wrapper}>
      <Table headers={mockData.headers} items={mockData.items} />
    </div>
  );
}

export default App;
