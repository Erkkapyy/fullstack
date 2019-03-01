import React, { useState, useEffect } from "react"
import userService from "../services/users"
import { Link } from "react-router-dom"

const UserList = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(u => setUsers(u))
  }, [])

  const users2 = users
  console.log("users: ", users)

  return (
    <div>
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th> Blogs created</th>
            </tr>
          </tbody>
        </table>
        {users2.map(usr => (
          <div key={usr.username}>
            <Link to={`/users/${usr.id}`}>{usr.username}</Link> --->{" "}
            {usr.blogs.length}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
