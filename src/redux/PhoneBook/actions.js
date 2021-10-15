import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const addContact = createAction(
  "contact/addContact",
  ({ name, number }) => ({
    payload: {
      id: uuidv4(),
      name,
      number,
    },
  })
);

export const removeContact = createAction("contact/removeContact");
export const getFilteredName = createAction("contact/filteredContacts");
