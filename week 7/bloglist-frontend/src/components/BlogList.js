import React from "react"
import Blog from "./Blog"

const BlogList = ({ blogForm, blogs2, likeBlog, deleteBlog, user }) => {
  return (
    <div>
      {blogForm()}
      {blogs2.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          currentUser={user}
        />
      ))}
    </div>
  )
}

export default BlogList
