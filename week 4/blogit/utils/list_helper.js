const _ = require("lodash")

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const mostLikes = blogs => {
  let biggest = -2147000000
  let bestBlog = {}
  blogs.map(blog => {
    if (blog.likes > biggest) {
      biggest = blog.likes
      bestBlog = blog
    }
  })

  return biggest === -2147000000 ? "no blogs" : bestBlog
}

const mostBlogs = blogs => {
  let bestAuth = {}
  let mostArticles = 0

  if (blogs.length === 0) {
    return {}
  }

  const array = _.orderBy(blogs, "author", "asc")
  console.log(array)

  let latestAuthor = blogs[0].author
  let articleCount = 0

  array.forEach(item => {
    if (item.author === latestAuthor) {
      articleCount++
      bestAuth = item
      if (articleCount > mostArticles) {
        mostArticles = articleCount
      }
    } else {
      latestAuthor = item.author
      articleCount = 1
    }
  })

  return { author: bestAuth.author, blogs: mostArticles }
}

const mostLikedAuthor = blogs => {
  let bestAuth = {}
  let mostLikes = 0

  if (blogs.length === 0) {
    return {}
  }

  let array = _.orderBy(blogs, "author", "asc")
  console.log(array)

  let lastAuthor = blogs[0].author
  let likes = 0

  array.forEach(item => {
    if (item.author === lastAuthor) {
      likes += item.likes
      bestAuth = item
      if (likes > mostLikes) {
        mostLikes = likes
      }
    } else {
      lastAuthor = item.author
      likes = item.likes
    }
  })

  return { author: bestAuth.author, likes: mostLikes }
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  mostLikedAuthor
}
