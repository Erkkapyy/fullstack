const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    url: "http://mielikuvitus.com",
    author: "cses",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8cf",
    title: "Selain pystyy suorittamaan vain javascriptiä",
    url: "http://mielikuvitus.com",
    author: "cses",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8cg",
    title: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    url: "http://mielikuvitus.com",
    author: "cses",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  console.log("log")
}

export default { getAll, setToken }
