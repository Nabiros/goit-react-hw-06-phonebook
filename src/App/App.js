import { PrimaryTitle, SecondaryTitle } from "./App.styled.jsx";
import ContactsForm from "../components/ContactsForm/ContactsForm";
import ContactsList from "../components/ContactsList/ContactsList.jsx";
import Filter from "../components/Filter/Filter.jsx";

export default function App() {
  return (
    <>
      <PrimaryTitle>Phonebook</PrimaryTitle>
      <ContactsForm />

      <SecondaryTitle>Contacts</SecondaryTitle>
      <Filter />
      <ContactsList />
    </>
  );
}
