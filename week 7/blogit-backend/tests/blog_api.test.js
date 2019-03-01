const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")

const api = supertest(app)

const initialBlogs = [
  {
    author: "Kevin",
    title: "Opetelkaa ajaa pyörää lol xd",
    url: "https://badblog.com",
    likes: -420
  },
  {
    author: "Tiera",
    title: "xd",
    url: "https://onlygoodmemes.com",
    likes: 420
  }
]

const initialUsers = [
  {
    username: "testi",
    name: "meemi",
    passwordHash: "supersalainen"
  },
  {
    username: "testi2",
    name: "tosikko",
    passwordHash: "ultrasalainen"
  }
]

describe("Blog testing", () => {
  beforeEach(async () => {
    await Blog.remove({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs have id field", async () => {
    const res = await api.get("/api/blogs")
    const blogs = res.body
    blogs.forEach(blog => expect(blog.id).toBeDefined())
  })

  test("post works for blogs", async () => {
    const testBlog = {
      title: "This is how we test",
      author: "Tester",
      url: "http://testingtesting.com",
      likes: 20
    }

    const res = await api.get("/api/blogs")
    const OGsize = res.body.length

    await api
      .post("/api/blogs")
      .send(testBlog)
      .expect(200)

    const res2 = await api.get("/api/blogs")
    const newSize = res2.body.length
    expect(newSize === OGsize + 1)
    expect(res2.body[OGsize].title).toEqual(testBlog.title)
  })

  test("0 likes if not specified", async () => {
    const testBlog = {
      title: "This is how we test",
      author: "Tester",
      url: "http://testingtesting.com"
    }

    const res = await api
      .post("/api/blogs")
      .send(testBlog)
      .expect(200)
    expect(res.body.likes).toEqual(0)
  })

  test("url and title required", async () => {
    const testBlog = {
      author: "Tester",
      url: "http://testingtesting.com"
    }

    const testBlog2 = {
      title: "This is how we test",
      author: "Tester"
    }

    await api
      .post("/api/blogs")
      .send(testBlog)
      .expect(400)

    await api
      .post("/api/blogs")
      .send(testBlog2)
      .expect(400)
  })

  test("blog delete works", async () => {
    const blogs = await api.get("/api/blogs")
    console.log(blogs.body[0].id)

    await api.delete(`/api/blogs/${blogs.body[0].id}`).expect(200)
  })

  test("blog replacement works", async () => {
    const blogs = await api.get("/api/blogs")
    const replacerBlog = {
      author: "Kevin",
      title: "Opetelkaa ajaa pyörää lol xd",
      url: "https://badblog.com",
      likes: 1337
    }
    console.log(blogs.body[0].id)

    await api
      .put(`/api/blogs/${blogs.body[0].id}`)
      .send(replacerBlog)
      .expect(200)
    const blogs2 = await api.get("/api/blogs")
    expect(blogs2.body[0].likes).toEqual(1337)
  })
})

describe("User testing", () => {
  beforeEach(async () => {
    await User.remove({})

    let userObject = new User(initialUsers[0])
    await userObject.save()

    userObject = new User(initialUsers[1])
    await userObject.save()
  })

  test("user with too short username will not be created", async () => {
    const invaliidi = {
      username: "xd",
      name: "asd",
      password: "riittava"
    }
    const result = await api
      .post("/api/users")
      .send(invaliidi)
      .expect(400)

    expect(result.body.error).toContain(
      "`username` (`xd`) is shorter than the minimum"
    )

    const users = await api.get("/api/users")
    expect(users.body.length).toEqual(2)
  })

  test("user with too short password will not be created", async () => {
    const invaliidi = {
      username: "riittava",
      name: "asd",
      password: "xd"
    }
    const result = await api
      .post("/api/users")
      .send(invaliidi)
      .expect(400)

    expect(result.body.error).toContain("password is shorter than the minimum")

    const users = await api.get("/api/users")
    expect(users.body.length).toEqual(2)
  })

  test("user without unique username will not be created", async () => {
    const invaliidi = {
      username: "testi",
      name: "asd",
      password: "riittava"
    }
    const result = await api
      .post("/api/users")
      .send(invaliidi)
      .expect(400)

    expect(result.body.error).toContain("expected `username` to be unique")

    const users = await api.get("/api/users")
    expect(users.body.length).toEqual(2)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
