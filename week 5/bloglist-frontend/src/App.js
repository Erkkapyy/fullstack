import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import { useField } from "./hooks"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField("text")
  const password = useField("password")
  const [errorMessage, setErrorMessage] = useState(null)
  const newTitle = useField("text")
  const newAuthor = useField("text")
  const newUrl = useField("text")
  const [successMessage, setSuccessMessage] = useState(null)
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
    console.log(blog.user)
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
      setSuccessMessage(`a new blog ${newTitle.props.value} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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
    return (
      <div>
        <Notification message={successMessage} />
        <Error message={errorMessage} />
        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
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
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="success">{message}</div>
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}

export default App
