import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { db } from "../api";
import { DocHeaders, Header, DocItems, Item } from "../components/table/models";
import Form from "../components/form/Form";
import { normalise } from "../utils";

type InventoryType = {
  headers: DocHeaders;
  items: DocItems;
  renderAddItem?: () => void;
  renderEditItem?: (item: Item) => void;
  removeItem?: (id: string) => Promise<void>;
};
const InventoryContext = React.createContext<InventoryType>({ headers: {}, items: {} });

const useInventory = (): InventoryType => useContext(InventoryContext);

type FormModal = {
  visible: boolean;
  item?: Item;
};

type Props = {
  children: any;
};
function InventoryProvider({ children }: Props): JSX.Element {
  const [headers, setHeaders] = useState<DocHeaders>({});
  const [items, setItems] = useState<DocItems>({});
  const [modal, setModal] = useState<FormModal>({ visible: false });

  const refItems = db.collection("items");

  useEffect(() => {
    const fetchHeaders = async () => {
      const refHeaders = db.collection("headers");
      try {
        const snapshot = await refHeaders.get();
        if (snapshot.empty) console.log("No such document!");
        const data: DocHeaders = {};
        snapshot.forEach((doc) => (data[doc.id] = doc.data() as Header));
        setHeaders(data);
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    const fetchItems = async () => {
      try {
        const snapshot = await refItems.get();
        if (snapshot.empty) console.log("No such document!");
        const data: DocItems = {};
        snapshot.forEach((doc) => (data[doc.id] = doc.data() as Item));
        setItems(data);
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    fetchHeaders();
    fetchItems();
  }, []);

  const writeItem = useCallback(
    async (item: Item) => {
      try {
        const { id = uuidV4() } = item;
        delete item.id;
        await refItems.doc(id).set(item);
        setItems((prevItems) => ({ ...prevItems, [id]: item }));
        setModal({ visible: false });
      } catch (e) {
        console.log(e);
      }
    },
    [refItems, setItems, setModal]
  );

  const removeItem = useCallback(
    async (id: string) => {
      try {
        await refItems.doc(id).delete();
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

  const closeModal = useCallback(() => setModal({ visible: false }), [setModal]);

  const renderAddItem = useCallback(() => setModal({ visible: true }), [setModal]);

  const renderEditItem = useCallback((item: Item) => setModal({ visible: true, item }), [setModal]);

  return (
    <InventoryContext.Provider value={{ headers, items, renderAddItem, renderEditItem, removeItem }}>
      {children}
      {modal.visible ? (
        <Form headers={normalise(headers, "order")} item={modal.item} onSubmit={writeItem} closeModal={closeModal} />
      ) : null}
    </InventoryContext.Provider>
  );
}

export { useInventory, InventoryProvider };
