import React, { useState, useEffect } from 'react'
import peopleService from './services/people'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleNameChange = ({target:{value}}) => setNewName(value)
  const handleNumberChange = ({target:{value}}) => setNewNumber(value)
  const handleFilterChange = ({target:{value}}) => setNewFilter(value)

  const makeError = errorMsg => {
    setErrorMessage(errorMsg)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const makeAlert = message => {
    setAlertMessage(message)
    setTimeout(() => setAlertMessage(null), 5000)
  }

  useEffect(()=>{
    peopleService
      .getAll()
      .then(response=> setPersons(response.data))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    if(!newName | !newNumber) return makeError('You must provide both a Name and Number')

    const person = persons.find(person => person.name === newName)
    if(person){
      if(window.confirm(`${newName} is already added to the phonebook, `+
      `replace the old number with a new one?`)){
        peopleService.update(person.id,newNumber)
        .then(({data}) => {
          setPersons(persons.map(person => person.id === data.id ? data : person))
          makeAlert(`${newName} updated...`)
        }).catch(err => makeError((JSON.stringify(err.response.data))))
      } return
    }
    peopleService
    .create({name:newName, phoneNumber: newNumber})
    .then(response => response.data)
    .then(({name,phoneNumber,id}) => {
      setPersons([...persons,{name,phoneNumber,id}])
      makeAlert(`${newName} added...`)
    })
    .catch(err => makeError(err.response.data.error))
  }

  const deletePerson = ({target:{value: id}}) => { //destructure the value out of target, rename it to id
    let personName = ''
    peopleService
    .getPerson(id)
    .then(({data:{name}}) => {
      personName = name
      return window.confirm(`Delete ${name}?`)})
    .then(answer => {
      if(answer){
        peopleService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .then(makeAlert(`${personName} deleted`))
      }
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} /><br/>
      <AlertMessage message={alertMessage} />
      <ErrorMessage message={errorMessage} />
      <AddNewPerson
        add={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <Numbers
        text='Numbers'
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

const Filter = ({filter,handleFilterChange}) => {
  return <>search: <input value={filter} onChange={handleFilterChange}></input><br/></>
}

const AddNewPerson = ({add, newName, newNumber, handleNumberChange, handleNameChange,}) => {
  return (
    <>
      <h2>Add New Person</h2>
      <form onSubmit={add}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
 )
}

const Numbers = ({persons, filter, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <thead>
          <tr>
            <th><b>Name</b></th><th><b>Number</b></th>
          </tr>
        </thead>
        <tbody>
          {persons.filter(person => RegExp(filter,"i").test(person.name) || RegExp(filter,"i").test(person.number))
            .map(({name,phoneNumber,id}) => {
              return (
                <Person 
                  key={id}
                  name={name} 
                  phoneNumber={phoneNumber}
                  id={id}
                  deletePerson={deletePerson}
                />
             )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const Person = ({name, phoneNumber,id,deletePerson}) => {
  return (
    <tr>
      <td>{name}</td>
      <td >{phoneNumber}  <button value={id} onClick={deletePerson}>delete</button></td>
    </tr>
  )
}

const AlertMessage = ({message}) => {
  const alertStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return message ? <p style={alertStyle}>{message}</p> : null
}

const ErrorMessage = ({message}) => {
  const alertStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return message ? <p style={alertStyle}>{message}</p> : null
}

export default App