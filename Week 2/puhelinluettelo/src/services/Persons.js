import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = ({ id, newObject }) => {
  return axios.put(`${baseUrl}/${id}`, newObject).catch(error => {
    console.log("baseurl: ", baseUrl, " id: ", id, "newObject: ", newObject)
    console.log("fail boi")
  })
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: del
}
