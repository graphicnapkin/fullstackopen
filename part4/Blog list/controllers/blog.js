const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async ( _ , response) => {
  const blogs = await Blog.find({})
  .populate('user', { name:1, username: 1, id: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async ({params:{id}}, response) => {
  const blog = await Blog.findById(id)
  response.json(blog)
})

blogRouter.post('/', async ({body:{title,author,likes,url,userId}}, response) => {
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