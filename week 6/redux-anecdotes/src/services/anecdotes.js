import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const newObject = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const replace = async input => {
  const newObject = {
    ...input,
    votes: input.votes + 1
  }
  const repUrl = `${baseUrl}/${input.id}`
  const response = await axios.put(repUrl, newObject)
  return response.data
}

export default { getAll, createNew, replace }
