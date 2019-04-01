import React, { useState } from "react"
const _ = require("lodash")

const Books = props => {
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  let books = props.result.data.allBooks
  console.log("books: ", books)
  let allGenres = []
  books.forEach(b => {
    allGenres = allGenres.concat(b.genres)
  })
  allGenres = _.uniq(allGenres)
  console.log("all genres: ", allGenres)
  console.log("current genre: ", genre)
  if (genre !== null) {
    books = books.filter(b => b.genres.includes(genre))
  }

  const currentUser = props.currentUser.data.me
  console.log("current user: ", currentUser.username)
  if (genre === null) {
    setGenre(currentUser.favoriteGenre)
  }
  if (books === undefined || books === null) {
    return <div>loading ... </div>
  } else {
    return (
      <>
        <h2>recommendations</h2>

        <p>
          books in your favourite genre <strong>{genre}</strong>
        </p>

        <table>
          <tbody>
            <tr>
              <th />
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

export default Books
