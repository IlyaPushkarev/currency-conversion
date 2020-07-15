import React from 'react'
import styles from './Header.module.css'
import Menu from '../Menu/Menu'

const Header = (props) => {
  function selectBaseCurrency(e) {
    e.currentTarget.value && props.changeBaseCurrency(e.currentTarget.value)
    e.currentTarget.blur()
  }

  return (
    <div className={[styles['header-wrapper']].join(' ')}>
      <Menu />

      <div className={styles['base-currency-wrapper']}>
        <span className={styles['base-currency-wrapper__name']}>
          Base currency
        </span>
        <div className={styles['base-currency-list-box']}>
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
      </div>
    </div>
  )
}

export default Header
