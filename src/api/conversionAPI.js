import API from './api'

const conversionAPI = {
  getLatestCurrency: (baseOn) => {
    // debugger
    if (!baseOn) baseOn = 'USD'
    return API.get(`latest?base=${baseOn}`)
  },
  getCurrencyNames: () => {
    return API.get(`https://openexchangerates.org/api/currencies.json`)
  },
  convert: (val, from, to) => {
    return API.get(`latest?base=${from}&symbols=${to}`)
  },
}

export default conversionAPI
