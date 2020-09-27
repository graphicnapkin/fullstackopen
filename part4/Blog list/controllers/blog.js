const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async ( _ , response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async ({params:{id}}, response) => {
  const blog = await Blog.findById(id)
  response.json(blog)
})

blogRouter.post('/', async ({body}, response) => {
  const blog = new Blog({...body, likes: body.likes || 0})
  const result = await blog.save()
  response.status(201).json(result)
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