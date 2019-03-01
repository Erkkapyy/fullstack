import React, { useState, useEffect } from "react"
import userService from "../services/users"

const User = id => {
  const [user, setUser] = useState({})
  console.log("idxdxd: ", id)

  useEffect(() => {
    userService.getById(id.id).then(result => setUser(result))
  }, [])

  console.log("blögs ", user)
  if (user.blogs === null || user.blogs === undefined) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs:</h3>

      {user.blogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default User
