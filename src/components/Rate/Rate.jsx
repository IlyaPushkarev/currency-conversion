import React from 'react'

const Rate = (props) => {
  // debugger
  return (
    <div>
      <h1>Rate</h1>
      {props.currencyData.map((item, i) => {
        return (
          <div key={i}>
            <span>{item.contraction}</span>
            <span>{item.fullName}</span>
            <span>{item.rate}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Rate
