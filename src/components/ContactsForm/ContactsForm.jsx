import { Form, Label, Input} from './ContactsForm.styled';
import { Button } from '../Buttons/Buttons.styled';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Notify } from "notiflix";
import { addContact } from '../../redux/PhoneBook/actions';
import { contacts } from '../../redux/PhoneBook/selectors';

function ContactsForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const stateContact = useSelector(contacts);
  const dispatch = useDispatch();

  const nameId = uuidv4();
  const numberId = uuidv4();

  const handleChange = e => {
    const { value, name } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    newContact();
    setName('');
    setNumber('');
  };

  const newContact = () => {
    const addToContact = {
      name,
      number,
    };
    stateContact.some(
      contact => contact.name.toLowerCase() === addToContact.name.toLowerCase(),
    )
      ? notification(addToContact.name)
      : dispatch(addContact(addToContact));
  };

  const notification = name =>
    Notify.warning(name + " is already in contacts.")

  return (
    <>
      <Form action="" onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          onChange={handleChange}
          type="text"
          name="name"
          id={nameId}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <Label htmlFor="number">Number</Label>
        <Input
          onChange={handleChange}
          type="tel"
          name="number"
          id={numberId}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <Button type="submit"> Add contact</Button>
      </Form>
    </>
  );
}

const mapStateToProps = state => ({
  contacts: state.contacts.item,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(addContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsForm);

