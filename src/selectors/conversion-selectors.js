import { createSelector } from 'reselect'

export const rates = (state) => {
  return state.conversion.rates
}

export const currencyNames = (state) => {
  return state.conversion.currencyNames
}

export const getCurrencyData = createSelector(
  [rates, currencyNames],
  (rates, currencyNames) => {
    debugger
    let rez = []
    let temp = {}

    for (let key in rates) {
      temp['contraction'] = key
      temp['rate'] = rates[key]
      temp['fullName'] = currencyNames[key]

      rez.push(temp)
      temp = {}
    }
    return rez
  }
)
