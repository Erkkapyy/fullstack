const { ApolloServer, UserInputError, gql } = require("apollo-server")
const uuid = require("uuid/v1")
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const ObjectId = require("mongoose").Types.ObjectId
const jwt = require("jsonwebtoken")
const { PubSub } = require("apollo-server")
const pubsub = new PubSub()

mongoose.set("useFindAndModify", false)

const MONGODB_URI =
  "mongodb://fullstack:sekred2@ds147225.mlab.com:47225/fullstack2019-library"

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY"

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).count(),
    authorCount: () => Author.find({}).count(),
    allBooks: (root, args) => {
      console.log("args: ", args)

      if (args.genre === undefined) {
        return Book.find({}).populate("author", { name: 1 })
      } else {
        return Book.find({ genres: args.genre }).populate("author", { name: 1 })
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async root => {
      const xd = await Book.find({
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby"
      })
      /*console.log("xd: ", xd[0].author)
      console.log("root author ", root._id)
      console.log(xd[0].author.equals(root._id))*/

      const cx = await Book.find({}).populate("author")
      //console.log("cx: ", cx)

      return cx.filter(c => c.author._id.equals(root._id)).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (context.currentUser === undefined || context.currentUser === null) {
        throw new UserInputError("You must be logged in!", {})
      }
      const author = await Author.findOne({ name: args.author })
      if (
        author === undefined ||
        author === null ||
        !author.name === args.author
      ) {
        const newAuthor = new Author({
          name: args.author,
          born: null
        })
        await newAuthor.save()
      }
      const apu = await Author.findOne({ name: args.author })
      console.log("apu apustaja: ", apu)

      const book = new Book({ ...args, author: apu._id })
      console.log("book: ", book)
      const currentBooks = await Book.findOne({ title: args.title })
      console.log("currentBook: ", currentBooks)

      if (currentBooks === null) {
        console.log("all good ", currentBooks)
      } else {
        throw new UserInputError("Book title must be unique", {
          invalidArgs: book.title
        })
      }

      await book.save()
      const addedBook = await Book.findById(book._id).populate("author")
      console.log("added book: ", addedBook)

      pubsub.publish("BOOK_ADDED", { bookAdded: addedBook })

      return addedBook
    },
    editAuthor: async (root, args, context) => {
      if (context.currentUser === undefined || context.currentUser === null) {
        throw new UserInputError("You must be logged in!", {})
      }
      if (typeof args.setBornTo !== "number") {
        throw new UserInputError("Born date must be numerical", {
          invalidArgs: args.setBornTo
        })
      }
      const editedAuthor = {
        name: args.name,
        born: args.setBornTo
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        editedAuthor
      )
      console.log("author:", author)

      console.log("editedAuthor: ", editedAuthor)

      return editedAuthor

      /*if (!authors.find(a => a.name === args.name)) {
        return null
      }
      const editedAuthor = {
        ...authors.find(a => a.name === args.name),
        born: args.setBornTo
      }
      authors = authors.map(a =>
        a.name === editedAuthor.name ? editedAuthor : a
      )
      return editedAuthor*/
    },
    createUser: (root, args) => {
      const user = new User({
        ...args
      })
      console.log("user: ", user)

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log("moikkelis moi")
        return pubsub.asyncIterator(["BOOK_ADDED"])
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
