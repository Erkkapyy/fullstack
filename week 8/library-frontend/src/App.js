import React, { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import { useApolloClient } from "react-apollo-hooks"
import { gql } from "apollo-boost"
import { useQuery, useMutation } from "react-apollo-hooks"
import { Subscription } from "react-apollo"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
    }
    genres
    published
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
// const BOOK_ADDED = gql`
//   subscription {
//     bookAdded {
//       title
//       author {
//         name
//         born
//       }
//     }
//   }
// `

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const addBook = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`

const editAuthor = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const allAuthors = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const allBooks = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const me = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(localStorage.getItem("library-user-token"))
  const books = useQuery(allBooks)
  const login = useMutation(LOGIN)
  const client = useApolloClient()

  const currentUser = useQuery(me)
  const authors = useQuery(allAuthors)
  const includedIn = (set, object) =>
    set.map(p => p.title).includes(object.title)

  const createBook = useMutation(addBook, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: allBooks })
      const addedBook = response.data.addBook
      console.log("added Book updatessa: ", addedBook)

      if (!includedIn(dataInStore.allBooks, addedBook)) {
        dataInStore.allBooks.push(addedBook)
        client.writeQuery({
          query: allBooks,
          data: dataInStore
        })
      }
    },
    refetchQueries: [{ query: allAuthors }, { query: allBooks }]
  })

  const eAuthor = useMutation(editAuthor, {
    refetchQueries: [{ query: allAuthors }, { query: allBooks }]
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </div>
        <Authors
          show={page === "authors"}
          result={authors}
          editAuthor={eAuthor}
        />
        <Recommendations
          show={page === "recommend"}
          currentUser={currentUser}
          result={books}
        />
        <Books show={page === "books"} result={books} />
        <NewBook show={page === "add"} addBook={createBook} />
        <Subscription
          subscription={BOOK_ADDED}
          onSubscriptionData={({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`Book ${addedBook.title} was added!`)
            console.log("Sub data: ", addedBook)

            const dataInStore = client.readQuery({ query: allBooks })
            console.log("datainstore: ", dataInStore)

            if (!includedIn(dataInStore.allBooks, addedBook)) {
              console.log("lololololol")

              dataInStore.allBooks.push(addedBook)
              client.writeQuery({
                query: allBooks,
                data: dataInStore
              })
            }
          }}
        >
          {() => null}
        </Subscription>
      </div>
    )
  } else {
    return (
      <>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors
          show={page === "authors"}
          result={authors}
          editAuthor={eAuthor}
        />

        <Books show={page === "books"} result={books} />

        <LoginForm
          show={page === "login"}
          login={login}
          setToken={setToken}
          setPage={setPage}
        />

        <Subscription
          subscription={BOOK_ADDED}
          onSubscriptionData={({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`Book ${addedBook.title} was added!`)
            console.log("Sub data: ", addedBook)

            const dataInStore = client.readQuery({ query: allBooks })
            if (!includedIn(dataInStore.allBooks, addedBook)) {
              dataInStore.allBooks.push(addedBook)
              client.writeQuery({
                query: allBooks,
                data: dataInStore
              })
            }
          }}
        >
          {() => null}
        </Subscription>
      </>
    )
  }
}

export default App
