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

  return blogs.reduce((top,{author}) => { 
    authors[author] ? authors[author]++ : authors[author] = 1
    return authors[author] < top.blogs ? top : { author, blogs: authors[author] }
  }, { blogs: 0 })
}

const mostLikes = blogs => {
  if(blogs.length === 0) return {}
  
  const authors = {}

  return blogs.reduce((top,{author, likes}) => { 
    authors[author] ? authors[author] += likes : authors[author] = likes
    return authors[author] < top.likes ? top : { author, likes: authors[author] }
  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}