import React, {useState} from 'react'

function BlogForm({createBlogPost}) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogPost = (event) => {
    event.preventDefault()
    createBlogPost({
      title,
      author,
      url
    })
  }

  return (
    <>
      <form onSubmit={addBlogPost}>
        <h2>new blog</h2>
        <div>
          {`title:    `} 
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          {`author: `} 
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          {`url: `} 
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
