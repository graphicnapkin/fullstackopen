import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const users = await axios.get(baseUrl)
  return users.data
}

export default { getAllUsers }