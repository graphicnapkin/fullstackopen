import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const getBlog = id => {
  return axios
    .get(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const postBlog = (blog, token) => {
  const headers = { 'Authorization': `Bearer ${token}` }
  return axios
    .post(baseUrl, blog, { headers })
    .then(response => response.data)
}

const likeBlog = ({ id, likes }, token) => {
  const headers = { 'Authorization': `Bearer ${token}` }
  const request = axios.put(`${baseUrl}/${id}`,{ likes }, { headers })
  return request.then(response => response.data)
}

const commentBlog = ({ id, comments }, token) => {
  const headers = { 'Authorization': `Bearer ${token}` }
  const request = axios.put(`${baseUrl}/${id}`,{ comments }, { headers })
  return request.then(response => response.data)
}
//comments: [{body: String, user: {username: String, id: String}}]
const deleteBlog = ({ id }, token) => {
  const headers = { 'Authorization': `Bearer ${token}` }
  axios.delete(`${baseUrl}/${id}`, { headers })
}

export default {
  getAll,
  getBlog,
  postBlog,
  likeBlog,
  commentBlog,
  deleteBlog
}