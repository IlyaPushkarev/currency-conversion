import React, { useEffect, useState } from 'react'
import styles from './Converter.module.css'

const Converter = (props) => {
  // debugger
  const [isNewResult, setIsNewResult] = useState(false)
  const [selectVal, setSelectVal] = useState(props.baseCurrency)
  const [correctVal, setCorrectVal] = useState(false)

  useEffect(() => {
    setSelectVal(props.baseCurrency)
    setIsNewResult(false)
  }, [props.baseCurrency])

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (
      e.currentTarget.elements['currencyFrom'].value ===
      e.currentTarget.elements['currencyTo'].value
    ) {
      alert('Choose another currency')
    }

    if (e.currentTarget.elements['inputValue'].value) {
      setIsNewResult(true)
      props.convertCurrency(
        e.currentTarget.elements['inputValue'].value,
        e.currentTarget.elements['currencyFrom'].value,
        e.currentTarget.elements['currencyTo'].value
      )
      e.currentTarget.elements['inputValue'].value = ''
    } else {
      alert('Insert amount of currency')
    }
  }

  return (
    <div className={[styles['converter-wrapper']].join(' ')}>
      <div className={[styles['converter-header']].join(' ')}>
        <h1>Converter</h1>
      </div>
      <div className={[styles['converter-body']].join(' ')}>
        <div className={[styles['converter-form-wrapper']].join(' ')}>
          <form
            className={[styles['converter-form']].join(' ')}
            id={'convertForm'}
            onSubmit={(e) => onSubmitForm(e)}
          >
            <input
              className={[styles['converter-form__input']].join(' ')}
              onChange={(e) => {
                e.target.value && setCorrectVal(true)
              }}
              onFocus={() => setIsNewResult(false)}
              name={'inputValue'}
              type="number"
              id={'fromInput'}
              min={1}
              autoFocus
            />
            <div
              className={[styles['converter-form__select-wrapper']].join(' ')}
            >
              <label htmlFor="fromSelect">From</label>
              <select
                className={[styles['converter-form__select']].join(' ')}
                name="currencyFrom"
                id="fromSelect"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
              >
                {props.currencyData.map((item) => {
                  return (
                    <option key={item.id} value={item.contraction}>
                      {item.fullName}
                    </option>
                  )
                })}
              </select>
            </div>

            <div
              className={[styles['converter-form__select-wrapper']].join(' ')}
            >
              <label htmlFor="currencyTo">To</label>
              <select
                className={[styles['converter-form__select']].join(' ')}
                name="currencyTo"
                id="toSelect"
              >
                {props.currencyData.map((item) => {
                  return (
                    <option key={item.id} value={item.contraction}>
                      {item.fullName}
                    </option>
                  )
                })}
              </select>
            </div>

            <button
              className={[styles['converter-form__submitBtn']].join(' ')}
              type="submit"
              disabled={!correctVal}
            >
              convert
            </button>
          </form>
        </div>

        <div className={[styles['converter-result-wrapper']].join(' ')}>
          {props.isLoading ? (
            <div className={[styles['converter-result__preloader']].join(' ')}>
              Компьютер считает деньги
            </div>
          ) : (
            <>
              {correctVal && isNewResult && props.converts.length > 0 && (
                <>
                  <span
                    className={[styles['converter-result__title']].join(' ')}
                  >
                    Result:
                  </span>
                  <span
                    className={[styles['converter-result__valueFrom']].join(
                      ' '
                    )}
                  >
                    {props.converts[props.converts.length - 1].val}
                  </span>
                  <span
                    className={[styles['converter-result__fromCurrency']].join(
                      ' '
                    )}
                  >
                    {props.converts[props.converts.length - 1].from}
                  </span>
                  =
                  <span
                    className={[styles['converter-result-valueTo']].join(' ')}
                  >
                    {props.converts[props.converts.length - 1].result}
                  </span>
                  <span
                    className={[styles['converter-result__toCurrency']].join(
                      ' '
                    )}
                  >
                    {props.converts[props.converts.length - 1].to}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Converter
