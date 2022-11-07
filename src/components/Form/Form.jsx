import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getItems } from 'redux/selectors';
import {PhonebookForm, PhonebookHeader, PhonebookLabel, PhonebookInput, PhonebookButton}from './Form.styled'


const nameInputId = nanoid();
const numberInputId = nanoid() 


const Form = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const items = useSelector(getItems);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const {name, value} = e.currentTarget;  
    
    switch(name) {
      case "number":
        return setPhone(value); 
      case "name":
        return setName(value); 
      default:
      return;
    }
  };

  
  const chekingContacts = () => {
    const findContact = items.find((item) => item.name === name);
    const findNumber = items.find((item) => item.phone === phone);

    if (findContact) { 
      alert(`${name} is already in contacts`);      
    } 
      else if (findNumber) { 
      alert(`${phone} is already in contacts`);      
    }             
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    chekingContacts()
    dispatch(addContact({name, phone}));
    setName('');
    setPhone('');
      };




  return(
      <PhonebookForm onSubmit={handleSubmit}>
      <PhonebookHeader>Phonebook</PhonebookHeader>
        <PhonebookLabel>Name
          <PhonebookInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInputChange}
            value={name}    
            id={nameInputId}          
          /> 
        </PhonebookLabel>
          
        <PhonebookLabel>Number
          <PhonebookInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleInputChange}
            value={phone}  
            id={numberInputId}            
          />  
        </PhonebookLabel>
      
        <PhonebookButton type="submit">Add number</PhonebookButton>
      </PhonebookForm >
    
  )
}

export default Form;