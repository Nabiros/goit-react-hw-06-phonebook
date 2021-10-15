import { List, ListItem } from "./ContactsList.styled";
import { Button } from '../Buttons/Buttons.styled';
import { connect } from "react-redux";
import { removeContact } from "../../redux/PhoneBook/actions";

function ContactsList({ contacts, deleteId }) {
  return (
    <div>
      <List>
        {contacts.map(contact => {
          const { id, name, number } = contact;
          return (
            <ListItem key={id}>
              {name} - {number}{' '}
              <Button type="button" onClick={() => deleteId(id)}>
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

const nameFilter = state => {
  return state.contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(state.contacts.filter.toLowerCase()),
  );
};

const mapStateToProps = state => ({
  contacts: nameFilter(state),
});

const mapDispatchToProps = dispatch => ({
  deleteId: id => dispatch(removeContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);