const dummy = _ => {
  return 1
}

const totalLikes = blogs => {
  if(blogs.length === 0) return 0
  return blogs.reduce((total, {likes}) => total + +likes, 0)
}

const favoriteBlog = blogs => {
  if(blogs.length === 0) return {}
  const { title, author, likes } = blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite
  },{ likes:0 })
  return { title, author, likes }
}

const mostBlogs = blogs => {
  if(blogs.length === 0) return {}
  const authors = {}

  return blogs.reduce((top,blog) => { 
    authors[blog.author] ? authors[blog.author]++ : authors[blog.author] = 1
    return authors[blog.author] < top.blogs ? top : { author: blog.author, blogs: authors[blog.author] }
  }, { author: '', blogs: 0 })
}

const mostLikes = blogs => {
  if(blogs.length === 0) return {}
  const authors = {}

  return blogs.reduce((top,blog) => { 
    authors[blog.author] ? authors[blog.author] += blog.likes : authors[blog.author] = blog.likes
    return authors[blog.author] < top.likes ? top : { author: blog.author, likes: authors[blog.author] }
  }, { author: '', likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}