import API from './api'

const conversionAPI = {
  getLatestCurrency: (baseOn) => {
    return API.get(
      `latest.json?app_id=83b3edabe71b43b79c195101da6833b5&base=${baseOn}`
    )
  },
  getCurrencyNames: () => {
    return API.get(`https://openexchangerates.org/api/currencies.json`)
  },
}

export default conversionAPI
