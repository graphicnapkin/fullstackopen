const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async ( _ , response) => {
  const blogs = await Blog.find({})
  .populate('user', { name:1, username: 1, id: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async ({params:{id}}, response) => {
  const blog = await Blog.findById(id)
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const {body:{title,author,likes,url,userId}} = request
  token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.emitWarning.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  
  const user = await User.findById(userId)
  
  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
    likes: likes || 0
  })
  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async ({params:{id}}, response) => {
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})   


blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog
  .findByIdAndUpdate(request.params.id,{
    $set:{ likes:request.body.likes }},
  { 
    new: true,
    useFindAndModify: false
  })
  const {title,author,url,likes,_id}=updatedBlog
  response.json({title,author,url,likes,id:_id.toString()})
})


module.exports = blogRouter