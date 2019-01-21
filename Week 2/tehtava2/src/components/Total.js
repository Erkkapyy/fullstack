import React from "react"

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Yhteensä {parts.reduce((total, part) => total + part.exercises, 0)}{" "}
        tehtävää
      </p>
    </div>
  )
}

export default Total
