import React from "react"
import "jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "react-testing-library"
import Blog from "./Blog"
import { prettyDOM } from "dom-testing-library"

afterEach(cleanup)

test("renders only title and author at first", () => {
  const blog = {
    title: "Komponenttitestaus tapahtuu react-testing-library:llä",
    author: "saas",
    url: "http://getbytext.org",
    likes: 10
  }

  const onClick = () => {
    console.log("lol xd")
  }

  const deleteBlog = () => {
    console.log("jee")
  }

  const component = render(
    <Blog blog={blog} likeBlog={onClick} deleteBlog={deleteBlog} />
  )

  expect(component.container).toHaveTextContent(
    "Komponenttitestaus tapahtuu react-testing-library:llä"
  )

  expect(component.container).toHaveTextContent("saas")
  expect(component.container).not.toHaveTextContent("10 likes")
})

it("clicking a blog shows full description", async () => {
  const blog = {
    title: "Komponenttitestaus tapahtuu react-testing-library:llä",
    author: "saas",
    url: "http://getbytext.org",
    likes: 10
  }

  const deleteBlog = () => {
    console.log("jee")
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} deleteBlog={deleteBlog} />
  )

  const { getByText } = component

  const button = getByText(
    "Komponenttitestaus tapahtuu react-testing-library:llä saas"
  )
  fireEvent.click(button)

  /*console.log(prettyDOM(component))*/

  expect(component.container).toHaveTextContent(
    "Komponenttitestaus tapahtuu react-testing-library:llä"
  )

  expect(component.container).toHaveTextContent("saas")

  expect(component.container).toHaveTextContent("http://getbytext.org")

  expect(component.container).toHaveTextContent("10 likes")
})
