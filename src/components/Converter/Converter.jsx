import React, { useState } from 'react'

const Converter = (props) => {
  const [isNewResult, setIsNewResult] = useState(false)

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (
      e.currentTarget.elements['currencyFrom'].value ===
      e.currentTarget.elements['currencyTo'].value
    ) {
      alert('Choose another currency')
      return
    }

    if (e.currentTarget.elements['inputValue'].value) {
      setIsNewResult(true)
      props.convertCurrency(
        e.currentTarget.elements['inputValue'].value,
        e.currentTarget.elements['currencyFrom'].value,
        e.currentTarget.elements['currencyTo'].value
      )
    } else {
      alert('Insert amount of currency')
      return
    }
  }

  return (
    <div>
      <h1>Converter</h1>

      <form id={'convertForm'} onSubmit={(e) => onSubmitForm(e)}>
        <input
          onChange={(e) => {
            !e.target.value && setIsNewResult(false)
          }}
          name={'inputValue'}
          type="number"
          id={'fromInput'}
          min={1}
          autoFocus
        />

        <select
          name="currencyFrom"
          id="fromSelect"
          defaultValue={props.baseCurrency}
        >
          {props.currencyData.map((item) => {
            return (
              <option key={item.id} value={item.contraction}>
                {item.fullName}
              </option>
            )
          })}
        </select>

        <select name="currencyTo" id="toSelect">
          {props.currencyData.map((item) => {
            return (
              <option key={item.id} value={item.contraction}>
                {item.fullName}
              </option>
            )
          })}
        </select>
        <button type="submit">convert</button>
      </form>
      {props.isLoading ? (
        <div>"Компьютер счетает деньги"</div>
      ) : (
        <div>
          {isNewResult && props.converts.length > 0 && (
            <span>{props.converts[props.converts.length - 1].result}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default Converter
