import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const postBlog = (blog, token) => {
  const request = axios.post(baseUrl, blog, {
    headers: { 'Authorization': `Bearer ${token}`}
  })
  return request.then(response => response.data)
}

export default { getAll, postBlog }