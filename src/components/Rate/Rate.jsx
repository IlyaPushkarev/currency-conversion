import React from 'react'
import styles from './Rate.module.css'
const Rate = (props) => {
  //debugger

  function addElectCurrency(e) {
    if (e.target.id === 'addElectCurrencyBtn') {
      const electCurrency = props.currencyData.filter((item) => {
        if (+e.currentTarget.id === +item.id) {
          item.isElected = true
          return item
        }
        return false
      })
      props.setElectCurrency(electCurrency[0])
    }
  }

  if (props.isLoading) {
    return <div>"Загрузка данных, не мешай компьютеру"</div>
  }

  return (
    <div className={[styles['rate-wrapper']].join(' ')}>
      <div className={[styles['rate-header']].join(' ')}>
        <h1>Rate</h1>
        <h2>(for 1 {props.baseCurrency})</h2>
      </div>
      <div className={[styles['rate-body']].join(' ')}>
        {!props.currencyData.length ? (
          <div>List of currencies is empty</div>
        ) : (
          props.currencyData.map((item, i) => {
            let classItem = ''
            if (i === props.amountElectCurrencies - 1) {
              classItem = [
                styles['rate-body__item'],
                styles['last-elect-currency'],
              ].join(' ')
            } else {
              classItem = [styles['rate-body__item']].join(' ')
            }
            return (
              <div
                className={classItem}
                key={item.id}
                id={item.id}
                onClick={function (e) {
                  addElectCurrency(e)
                }}
              >
                <span
                  className={[styles['rate-body__item-contraction']].join(' ')}
                >
                  {item.contraction}
                </span>
                <span className={[styles['rate-body__item-name']].join(' ')}>
                  {item.fullName}
                </span>
                <span className={[styles['rate-body__item-value']].join(' ')}>
                  {item.rate}
                </span>
                {!item.isElected ? (
                  <span
                    className={[styles['rate-body__item-addBtn']].join(' ')}
                    id={'addElectCurrencyBtn'}
                  >
                    +
                  </span>
                ) : (
                  <span
                    className={[styles['rate-body__item-addBtn']].join(' ')}
                  >
                    \/
                  </span>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Rate
