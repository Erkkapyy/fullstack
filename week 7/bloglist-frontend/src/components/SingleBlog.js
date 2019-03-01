import React from "react"

const SingleBlog = ({ blog, likeBlog }) => {
  if (blog === undefined) return null

  return (
    <div>
      <div>
        <h1>
          {blog.title} {blog.author}
        </h1>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>added by {blog.user ? blog.user.username : null}</div>
    </div>
  )
}

export default SingleBlog
