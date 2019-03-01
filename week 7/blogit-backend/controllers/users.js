const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body
    if (body.password.length < 3) {
      return response.status(400).json({
        error:
          "User validation failed: password is shorter than the minimum allowed length (3)."
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs")
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs")
  console.log("user: ", user)
  response.json(user)
})

module.exports = usersRouter
