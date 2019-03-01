const listHelper = require("../utils/list_helper")

const listWithoutBlogs = []

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

const listWithThreeBlogs = [
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "Huominen on huomenna",
    author: "Testimeemi",
    url: "http://whatislove.com",
    likes: 112,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f7",
    title: "Elämä on laiffia",
    author: "Testimeemi incarnated",
    url: "http://babydonthurtme.com",
    likes: 1337,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: -5,
    __v: 0
  }
]

const listWithFiveBlogs = [
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "Huominen on huomenna",
    author: "Testimeemi",
    url: "http://whatislove.com",
    likes: 112,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f7",
    title: "Elämä on laiffia",
    author: "Testimeemi incarnated",
    url: "http://babydonthurtme.com",
    likes: 1337,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: -5,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f6",
    title: "Ei voi tietää jos ei tiedä",
    author: "Testimeemi incarnated",
    url: "http://babydonthurtme.com",
    likes: 1337,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "I am algorithm boi",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 150,
    __v: 0
  }
]

describe("dummy boi", () => {
  test("dummy returns one", () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("when list has three blogs equals their likes combined", () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(1444)
  })

  test("when list has no blogs returns 0", () => {
    const result = listHelper.totalLikes(listWithoutBlogs)
    expect(result).toBe(0)
  })
})

describe("most likes single article", () => {
  test("returns no blogs if empty", () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    expect(result).toBe("no blogs")
  })

  test("returns best blog of three blogs", () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f7",
      title: "Elämä on laiffia",
      author: "Testimeemi incarnated",
      url: "http://babydonthurtme.com",
      likes: 1337,
      __v: 0
    })
  })

  test("returns given single blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    })
  })
})

describe("author with most blogs", () => {
  test("returns nothing if no blogs", () => {
    const result = listHelper.mostBlogs(listWithoutBlogs)
    expect(result).toEqual({})
  })

  test("returns author of single given blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 })
  })

  test("returns author with most blogs out of 5", () => {
    const result = listHelper.mostBlogs(listWithFiveBlogs)
    expect(result).toEqual({ author: "Testimeemi incarnated", blogs: 2 })
  })
})

describe("author with most total likes", () => {
  test("returns nothing if no blogs", () => {
    const result = listHelper.mostLikedAuthor(listWithoutBlogs)
    expect(result).toEqual({})
  })

  test("returns author of single given blog", () => {
    const result = listHelper.mostLikedAuthor(listWithOneBlog)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 })
  })

  test("returns author with most likes out of 5", () => {
    const result = listHelper.mostLikedAuthor(listWithFiveBlogs)
    expect(result).toEqual({ author: "Testimeemi incarnated", likes: 2674 })
  })
})
