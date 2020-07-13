import { createSelector } from 'reselect'
import _ from 'lodash'

export const rates = (state) => {
  return state.conversion.rates
}

export const currencyNames = (state) => {
  return state.conversion.currencyNames
}

export const electCurrencies = (state) => {
  return state.conversion.electCurrency
}

/*export const getBaseCurrency = (state) => {
  return state.conversion.baseCurrency
}*/
export const getCurrencyData = createSelector(
  [rates, currencyNames, electCurrencies],
  (rates, currencyNames, electCurrencies) => {
    // debugger
    let rez = []
    let temp = {}
    let i = 1
    for (let key in rates) {
      temp['id'] = i
      temp['contraction'] = key
      temp['rate'] = rates[key]
      temp['fullName'] = currencyNames[key]
      temp['isElected'] = false

      rez.push(temp)
      temp = {}
      i++
    }

    rez = _.differenceBy(rez, electCurrencies, 'id')
    rez.unshift(...electCurrencies)

    return rez
  }
)
