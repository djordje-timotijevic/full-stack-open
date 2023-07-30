import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import searchForName from './helpers/helpers'
import Notification from './components/Notification'
import Error from './components/Error'
import phoneBookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const hook = () => {
    phoneBookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const clearEntryFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handelNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handelFilterChange = (event) => {
    let inputedText = event.target.value
    setFilter(inputedText)

    // Create array containing names that match current filter value
    const filtered = persons.filter((person) => {
      const nameToCheck = person.name.toLocaleLowerCase()
      const filterValue = filter.toLocaleLowerCase()
      return nameToCheck.includes(filterValue) ? true : false
    })

    setFilteredPersons(filtered)
  }

  const addData = (event) => {
    event.preventDefault()
    
    const newNumberObject = {
      name: newName,
      number: newNumber
    }

    // Check if new name exists in phonebook
    if (searchForName(persons, newName) === true) {
      let confirmUpdate = window.confirm(`The phonebook already has an entry ${newName}. Would you like to update the number with the new one?`)
      if (confirmUpdate === true) {
        const entry = persons.find((person) => person.name === newName)
        phoneBookService
          .update(entry.id, newNumberObject)
          .then(newEntry => {
            console.log(newEntry, 'new entry');
            let updatedList = persons.map(person => {
              if (person.name === newName) person.number = newEntry.number
              return person
            })
            setPersons(updatedList)
            setFilteredPersons(updatedList)
          })
          .catch(() => {
            const updatedList = persons.filter((person) => person.name !== newName)
            setPersons(updatedList)
            setFilteredPersons(updatedList)
            setError('Error entry does not exist on server!')
            setTimeout(() => { setError(null) }, 3000);
            clearEntryFields()
          })
        return 0
      } else if (confirmUpdate === false) {
        clearEntryFields()
        return 0
      }
    }

    // Send new name to server
    phoneBookService
      .create(newNumberObject)
      .then(newNumber => {
        setPersons(persons.concat(newNumber))
        setFilteredPersons(persons.concat(newNumber))
      })

    setNotification(`Added ${newName}`)
    setTimeout(() => {
      setNotification(null)
    }, 3000);

    clearEntryFields()
  }

  const deleteEntry = (entryName, id) => {
    if (window.confirm('Do you wish to delete this entry?')) {
      phoneBookService
        .deleteEntry(id)
      const updatedList = persons.filter((person) => person.id !== id)
      setPersons(updatedList)
      setFilteredPersons(updatedList)
      setNotification('Entry removed successfully')
      setTimeout(() => {
        setNotification(null)
      }, 3000);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notification} />
      <Error text={error} />
      <Filter 
        value={filter}
        onChange={handelFilterChange}
      />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={addData}
        nameInput={[newName, handleNameChange]}
        numberInput={[newNumber, handelNumberChange]}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        handleDelete={deleteEntry}
      />
    </div>
  )
}

export default App