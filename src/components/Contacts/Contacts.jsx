import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/operations';
import { getItems,getFilter } from 'redux/selectors';
import {ContactsItem, ContactsList, ContactsDiv,ContactsSpan} from './Contacts.styled';


const Contacts = () => {
  
  const filter = useSelector(getFilter);
  const items = useSelector(getItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

    const contactFiltering = () => { 
      const normalizeFilter = filter.toLowerCase();
      return items.filter(item => item.name.toLowerCase().includes(normalizeFilter))
    };

  const filteredContacts = contactFiltering(); 

  return (
    <ContactsDiv>
      <ContactsList>
      {filteredContacts.map(({ id, name, phone }) => 
        <ContactsItem key={id}>
          {name}: {phone}
          <ContactsSpan type='button' onClick={() => {
                dispatch(deleteContact(id));
              }}>❌</ContactsSpan> 
        </ContactsItem>)
      }   
     </ContactsList>
    </ContactsDiv> 
  ) 
}


export default Contacts;
