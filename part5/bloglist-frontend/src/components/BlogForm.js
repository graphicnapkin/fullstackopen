import React from 'react'

function BlogForm({handleBlogPost, newBlog, setNewBlog}) {
  const blog = {}
  let title,author,url
  return (
    <form onSubmit={handleBlogPost}>
      <div>
        title
        <input
          type="text"
          name="Title"
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="Author"
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="Url"
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
