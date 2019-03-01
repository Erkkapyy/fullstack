import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import userService from "./services/users"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import SingleBlog from "./components/SingleBlog"
import User from "./components/User"
import { showNotification } from "./reducers/notificationReducer"
import { useField } from "./hooks"
import { connect } from "react-redux"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom"
import UserList from "./components/UserList"
import Blog from "./components/Blog"

const App = props => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField("text")
  const password = useField("password")
  const [errorMessage, setErrorMessage] = useState(null)
  const newTitle = useField("text")
  const newAuthor = useField("text")
  const newUrl = useField("text")
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = async blog => {
    const newObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
      id: blog.id
    }
    await blogService.update(blog.id, newObject)
    const updBlogs = await blogService.getAll()
    setBlogs(updBlogs)
  }

  const deleteBlog = async blog => {
    if (window.confirm(`remove blog ${blog.title}`))
      await blogService.del(blog.id)
    const updBlogs = await blogService.getAll()
    setBlogs(updBlogs)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.props.value,
        password: password.props.value
      })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))

      setUser(user)
    } catch (exception) {
      username.reset()
      password.reset()
      setErrorMessage("käyttäjätunnus tai salasana virheellinen")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const newBlog = async event => {
    event.preventDefault()
    try {
      const newObject = {
        title: newTitle.props.value,
        author: newAuthor.props.value,
        url: newUrl.props.value
      }
      const blog = await blogService.create(newObject)
      props.showNotification(`a new blog ${newTitle.props.value} added`, 5)
      setBlogs(blogs.concat(blog))
      setLoginVisible(false)
    } catch (exception) {
      setErrorMessage("Virheellinen blogi")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" }
    const showWhenVisible = { display: loginVisible ? "" : "none" }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" }
    const showWhenVisible = { display: loginVisible ? "" : "none" }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            newBlog={newBlog}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogs2 = blogs
  blogs2.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Error message={errorMessage} />
        {loginForm()}
      </div>
    )
  } else {
    const padding = { padding: 5 }
    return (
      <div>
        <Router>
          <div>
            <div>
              <Link style={padding} to="/">
                blogs
              </Link>
              <Link style={padding} to="/users">
                users
              </Link>
              {user.username} logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </div>
            <Notification />
            <Error message={errorMessage} />
            <h2>blogs</h2>
            <Route
              exact
              path="/"
              render={() => (
                <BlogList
                  blogForm={blogForm}
                  blogs2={blogs2}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                  user={user}
                />
              )}
            />
            <Route exact path="/users" render={() => <UserList />} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => {
                return <User id={match.params.id} />
              }}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => {
                const blogById = id => blogs.find(a => a.id === id)
                return (
                  <SingleBlog
                    blog={blogById(match.params.id)}
                    likeBlog={likeBlog}
                  />
                )
              }}
            />
          </div>
        </Router>
      </div>
    )
  }
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}

const mapDispatchToProps = {
  showNotification
}

const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App)
export default ConnectedApp
