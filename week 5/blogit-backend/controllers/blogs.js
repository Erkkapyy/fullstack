const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body
  /*const blog = new Blog(request.body)*/

  try {
    console.log("lulxd ", request.token)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(decodedToken.id)
    /*const user = await User.findById("5c5c3833f280e235fc1d2b4d")*/

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    const backEndBlog = await Blog.findById(savedBlog.id).populate("user", {
      username: 1,
      name: 1
    })

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(backEndBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    console.log("halooooo", request.params.id)
    console.log("user", user.id)
    console.log("blogUser", blog.user)
    if (
      blog.user === undefined ||
      blog.user === null ||
      blog.user.toString() === user.id.toString()
    ) {
      await Blog.deleteOne({ _id: request.params.id })
      response.status(200).end()
    } else {
      response.status(401).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user
  }

  try {
    await Blog.replaceOne({ _id: request.params.id }, newBlog)
    response.status(200).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
