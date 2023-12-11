import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { AppContainer, Heading1, Heading2 } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []); 

  const addContact = (contact) => {
    const isNameAlreadyExists = contacts.some(
      (existingContact) => existingContact.name === contact.name
    );

    if (isNameAlreadyExists) {
      alert(
        'This name is already in the phonebook. Please choose a different name.'
      );
      return;
    }

    const newContacts = [...contacts, contact];

    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const handleDeleteContact = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);

    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredContacts = getFilteredContacts();

  return (
    <AppContainer>
      <Heading1>Phonebook</Heading1>
      <ContactForm addContact={addContact} />
      <Heading2>Contacts</Heading2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </AppContainer>
  );
};

App.propTypes = {
  contacts: PropTypes.array,
};

export default App;


  
  

 