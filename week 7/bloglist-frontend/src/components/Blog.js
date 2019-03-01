import React, { useState } from "react"
import propTypes from "prop-types"
import { Link } from "react-router-dom"
const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  const [fullVisible, setFullVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  if (blog === null || blog === undefined) {
    return null
  }

  if (!fullVisible) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setFullVisible(true)}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      </div>
    )
  } else if (
    blog.user === undefined ||
    blog.user === null ||
    blog.user.username === currentUser.username
  ) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setFullVisible(false)}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
        </div>
        <div>
          {blog.likes} likes
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>added by {blog.user ? blog.user.username : null}</div>
        <div>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={() => setFullVisible(false)}>
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={() => likeBlog(blog)}>like</button>
          </div>
          <div>added by {blog.user ? blog.user.username : null}</div>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  likeBlog: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired
}

export default Blog
