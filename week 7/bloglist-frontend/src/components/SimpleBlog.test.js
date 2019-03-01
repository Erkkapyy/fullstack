import React from "react"
import "jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "react-testing-library"
import SimpleBlog from "./SimpleBlog"

afterEach(cleanup)

test("renders blog", () => {
  const blog = {
    title: "Komponenttitestaus tapahtuu react-testing-library:llä",
    author: "saas",
    likes: 10
  }

  const onClick = () => {
    console.log("lol xd")
  }

  const component = render(<SimpleBlog blog={blog} onClick={onClick} />)

  expect(component.container).toHaveTextContent(
    "Komponenttitestaus tapahtuu react-testing-library:llä"
  )

  expect(component.container).toHaveTextContent("saas")

  expect(component.container).toHaveTextContent("blog has 10 likes")
})

it("clicking the button calls event handler twice", async () => {
  const blog = {
    title: "Komponenttitestaus tapahtuu react-testing-library:llä",
    author: "saas",
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = getByText("like")
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
