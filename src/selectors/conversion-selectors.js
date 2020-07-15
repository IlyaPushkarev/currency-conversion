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
      temp['rate'] = rates[key].toFixed(2)
      temp['fullName'] = currencyNames[key]
      temp['isElected'] = false

      rez.push(temp)
      temp = {}
      i++
    }
    let newValueElectCurrencies = _.intersectionBy(rez, electCurrencies, 'id')
    newValueElectCurrencies.forEach((item) => (item.isElected = true))

    rez = _.differenceBy(rez, electCurrencies, 'id')
    rez.unshift(...newValueElectCurrencies)

    return rez
  }
)
export const historyConvert = (state) => state.conversion.historyConvert

export const getHistoryConvert = createSelector(
  [historyConvert],
  (historyConvert) => {
    return historyConvert
  }
)
