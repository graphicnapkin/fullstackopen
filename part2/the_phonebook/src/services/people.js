import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)
const getPerson = id => axios.get(`${baseUrl}/${id}`)
const create = newObject => axios.post(baseUrl, newObject)
const update = (id, newNumber) => {
  console.log(`${baseUrl}/${id}`, newNumber)
  return axios.put(`${baseUrl}/${id}`, {newNumber})
}
const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

export default { 
  getAll,
  getPerson,
  create, 
  update,
  deletePerson,
}