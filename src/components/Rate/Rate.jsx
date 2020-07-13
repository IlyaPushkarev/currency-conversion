import React from 'react'

const Rate = (props) => {
  //debugger
  function selectBaseCurrency(e) {
    e.currentTarget.value && props.changeBaseCurrency(e.currentTarget.value)
    e.currentTarget.blur()
  }

  function addElectCurrency(e) {
    if (e.target.id === 'addElectCurrencyBtn') {
      e.target.style.display = 'none'
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
    <div>
      <div>
        <span>Base currency</span>
        <select
          id="mainCurrency"
          onChange={(e) => selectBaseCurrency(e)}
          defaultValue={props.baseCurrency}
        >
          <option value={''}>Select currency</option>
          <option value={'USD'}>Доллар</option>
          <option value={'RUB'}>Рубль</option>
          <option value={'EUR'}>Евро</option>
        </select>
      </div>
      <h1>Rate</h1>
      {props.currencyData.map((item) => {
        return (
          <div
            key={item.id}
            id={item.id}
            onClick={function (e) {
              addElectCurrency(e)
            }}
          >
            <span>{item.contraction}</span>
            <span>{item.fullName}</span>
            <span>{item.rate}</span>
            {!item.isElected && <span id={'addElectCurrencyBtn'}>+</span>}
          </div>
        )
      })}
    </div>
  )
}

export default Rate
