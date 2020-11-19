import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { db, firebase } from "../api";
import { DocHeaders, DocItems, Item } from "../components/table/models";

type InventoryType = {
  headers: DocHeaders;
  items: DocItems;
  addItem?: (item: Item) => Promise<void>;
  removeItem?: (id: string) => Promise<void>;
  updateItems?: (items: DocItems) => Promise<void>;
};
const InventoryContext = React.createContext<InventoryType>({ headers: {}, items: {} });

const useInventory = (): InventoryType => useContext(InventoryContext);

type Props = {
  children: any;
};
function InventoryProvider({ children }: Props): JSX.Element {
  const [headers, setHeaders] = useState<DocHeaders>({});
  const [items, setItems] = useState<DocItems>({});

  const refItems = useMemo(() => db.collection("inventory").doc("items"), []);

  useEffect(() => {
    const fetchHeaders = async () => {
      const refHeaders = db.collection("inventory").doc("headers");
      try {
        const docHeaders = await refHeaders.get();
        if (docHeaders.exists) setHeaders(docHeaders.data() || {});
        else console.log("No such document!");
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    const fetchItems = async () => {
      try {
        const docItems = await refItems.get();
        if (docItems.exists) setItems(docItems.data() || {});
        else console.log("No such document!");
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    fetchHeaders();
    fetchItems();
  }, []);

  const addItem = useCallback(
    async (item: Item) => {
      try {
        const docItems: DocItems = { [uuidV4()]: item };
        await refItems.set(docItems);
        setItems((prevItems) => ({ ...prevItems, ...docItems }));
      } catch (e) {
        console.log(e);
      }
    },
    [refItems, setItems]
  );

  const removeItem = useCallback(
    async (id: string) => {
      try {
        await refItems.update({ [id]: firebase.firestore.FieldValue.delete() });
        setItems((prevItems) => {
          const newItems = { ...prevItems };
          delete newItems[id];
          return newItems;
        });
      } catch (e) {
        console.log(e);
      }
    },
    [refItems, setItems]
  );

  const updateItems = useCallback(
    async (items: DocItems) => {
      try {
        await refItems.update(items);
        setItems((prevItems) => ({ ...prevItems, ...items }));
      } catch (e) {
        console.log(e);
      }
    },
    [refItems, setItems]
  );

  return (
    <InventoryContext.Provider value={{ headers, items, addItem, removeItem, updateItems }}>
      {children}
    </InventoryContext.Provider>
  );
}

export { useInventory, InventoryProvider };
