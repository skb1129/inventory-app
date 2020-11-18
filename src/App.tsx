import React, { useEffect, useState } from "react";

import { db } from "./api";
import Navbar from "./components/navbar/Navbar";
import Table from "./components/table/Table";
import { DocHeaders, DocItems, Header, Item } from "./components/table/models";
import { AuthProvider } from './contexts/AuthContext'
import { normalise } from "./utils";
import classes from "./App.scss";

function App(): JSX.Element {
  const [headers, setHeaders] = useState<DocHeaders>({});
  const [items, setItems] = useState<DocItems>({});

  useEffect(() => {
    const fetchHeaders = async () => {
      const refHeaders = db.collection("inventory").doc("headers");
      try {
        const docHeaders = await refHeaders.get();
        if (docHeaders.exists) {
          setHeaders(docHeaders.data() || {});
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    const fetchItems = async () => {
      const refItems = db.collection("inventory").doc("items");
      try {
        const docItems = await refItems.get();
        if (docItems.exists) {
          setItems(docItems.data() || {});
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    fetchHeaders();
    fetchItems();
  }, []);

  return (
    <AuthProvider>
      <Navbar />
      <div data-testid="app" className={classes.wrapper}>
        <Table headers={normalise<DocHeaders, Header>(headers, "order")} items={normalise<DocItems, Item>(items)} />
      </div>
    </AuthProvider>
  );
}

export default App;
