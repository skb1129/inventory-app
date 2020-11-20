import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import { Item, Header } from "../table/models";
import classes from "./Form.scss";

type Props = {
  headers: Header[];
  item?: Item;
  onSubmit: (form: Item) => void;
  closeModal: () => void;
};
function Form({ headers, item = {}, onSubmit, closeModal }: Props): JSX.Element {
  const [form, setForm] = useState<Item>(item);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && event.target instanceof Node && !dialogRef.current.contains(event.target)) closeModal();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dialogRef]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [event.target.name]: event.target.value.replace(/\s\s+/g, " ") }));
  };
  const isValid = useMemo(() => {
    for (const header of headers) if (!form[header.id]?.trim()) return false;
    return true;
  }, [headers, form]);
  return (
    <div className={classes.modal}>
      <div ref={dialogRef} className={classes.wrapper}>
        {headers.map((header) => (
          <div key={header.id} className={classes.inputWrapper}>
            <label className={classes.label}>{header.text}</label>
            <input
              required
              type="text"
              className={classes.input}
              value={form[header.id] || ""}
              name={header.id}
              onChange={onChange}
            />
          </div>
        ))}
        <button
          className={classNames(classes.button, isValid ? "" : classes.buttonDisabled)}
          disabled={!isValid}
          onClick={() => onSubmit(form)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
