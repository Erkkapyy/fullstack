import React from "react"
import { render } from "react-testing-library"
jest.mock("./services/blogs")
import App from "./App"
import "jest-dom/extend-expect"

describe("<App />", () => {
  it("if no user logged, login page is shown", async () => {
    const component = render(<App />)
    component.rerender(<App />)

    expect(component.container).not.toHaveTextContent("HTML on helppoa")
    expect(component.container).toHaveTextContent("Log in to application")
    expect(component.container).toHaveTextContent("käyttäjätunnus")
  })

  it("if user is logged in, blogs are shown", async () => {
    const user = {
      id: "12312312312312",
      username: "tester",
      token: "1231231214",
      name: "Teuvo Testaaja"
    }

    await localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
    console.log(localStorage.getItem("loggedBlogAppUser"))

    const component = await render(<App />)
    component.rerender(<App />)
    component.debug()
    expect(component.container).toHaveTextContent("HTML on helppoa")
    expect(component.container).not.toHaveTextContent("Log in to application")
    expect(component.container).not.toHaveTextContent("käyttäjätunnus")
  })
})
