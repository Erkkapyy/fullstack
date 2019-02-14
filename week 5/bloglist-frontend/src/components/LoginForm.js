import React from "react"
import propTypes from "prop-types"

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input {...username.props} />
        </div>
        <div>
          salasana
          <input {...password.props} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  username: propTypes.object.isRequired,
  password: propTypes.object.isRequired
}

export default LoginForm
