import React, { Component } from "react";
import shortid from 'shortid';
import PropTypes, { shape } from 'prop-types';
import './App.css';

import ContactsList from "./Components/ContactsList";
import ContactsForm from "./Components/ContactsForm/ContactsForm";
import Filter from "./Components/Filter";


class App extends Component {
    static defaultProps = {
        totalContactsCount: null,
        visibleContacts: null,
    }
    static propTypes = {
        contacts: PropTypes.arrayOf(
            PropTypes, shape(
                {
                    id: PropTypes.any.isRequired,
                    name: PropTypes.string.isRequired,
                    number: PropTypes.string.isRequired,
                }
            )
        ),
        filter: PropTypes.string,
        totalContactsCount: PropTypes.number,
        visibleContacts: PropTypes.number,
    };
    state = {
        contacts:
            [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
        filter: '',
    };
    addContact = (name, number) => {
        const isInContacts = this.state.contacts.some(contact => contact.name === name)

        if (isInContacts) { alert(`${name} is already in contacts.`); return }
        
        if (name && number) {
            const contact = {
                id: shortid.generate(),
                name,
                number,
            };
            this.setState(prevState => ({
                contacts: [contact, ...prevState.contacts],
            }));
        }
    };
    deleteContact = (contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId)
        }))
    });

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value })
    }

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsContacts = JSON.parse(contacts);
        if (parsContacts) {
            this.state({ contacts: parsContacts });
        }
    }
    componentDidUpdate(prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));            
    }
}
    render() {
        const { contacts, filter } = this.state;
        const totalContactsCount = contacts.length;

        const normalizedFilter = this.state.filter.toLocaleLowerCase();
        const visibleContacts = this.state.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter),);
    return (<div className="App">
            <h1>Phonebook</h1>
            <ContactsForm contacts={contacts} onAddContact={this.addContact} />
            
            <h2>Contacts(total: {totalContactsCount})</h2>
            <Filter value={filter} onchange={this.changeFilter} />
            <ContactsList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
        </div>
        );
    }
}



export default App;