import React from "react"

const BlogForm = ({ newBlog, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
        <div>
          title
          <input {...newTitle.props} />
        </div>
        <div>
          author
          <input {...newAuthor.props} />
        </div>
        <div>
          url
          <input {...newUrl.props} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
