import _ from 'lodash'
import conversionAPI from '../api/conversionAPI'

const GET_LATEST_RATE_SUCCESS = 'GET_LATEST_RATE_SUCCESS'
const GET_LATEST_RATE_FAILURE = 'GET_LATEST_RATE_FAILURE'
const SET_LATEST_RATE = 'SET_LATEST_RATE'
const GET_CURRENCY_NAMES_SUCCESS = 'GET_CURRENCY_NAMES_SUCCESS'
const GET_CURRENCY_NAMES_FAILURE = 'GET_CURRENCY_NAMES_FAILURE'
const SET_CURRENCY_NAMES = 'SET_CURRENCY_NAMES'

const initialState = {
  isLoadedRate: true,
  rates: {},
  isLoadedCurrencyNames: true,
  currencyNames: {},
}
const conversionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_RATE_SUCCESS:
    case GET_LATEST_RATE_FAILURE:
    case GET_CURRENCY_NAMES_SUCCESS:
    case GET_CURRENCY_NAMES_FAILURE: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case SET_LATEST_RATE: {
      if (_.isEqual(state.rates, action.payload.rates)) {
        return state
      } else {
        return {
          ...state,
          rates: action.payload.rates,
        }
      }
    }
    case SET_CURRENCY_NAMES: {
      if (_.isEqual(state.currencyNames, action.payload.currencyNames)) {
        return state
      } else {
        return {
          ...state,
          currencyNames: action.payload.currencyNames,
        }
      }
    }
    default: {
      return state
    }
  }
}

export const getLatestRateSuccess = () => {
  return {
    type: GET_LATEST_RATE_SUCCESS,
    payload: {
      isLoadedRate: true,
    },
  }
}

export const getLatestRateFailure = () => {
  return {
    type: GET_LATEST_RATE_FAILURE,
    payload: {
      isLoadedRate: false,
    },
  }
}

export const setLatestRate = (rates) => {
  return {
    type: SET_LATEST_RATE,
    payload: {
      rates,
    },
  }
}

export const getCurrencyNamesSuccess = () => {
  return {
    type: GET_CURRENCY_NAMES_SUCCESS,
    payload: {
      isLoadedCurrencyNames: true,
    },
  }
}

export const getCurrencyNamesFailure = () => {
  return {
    type: GET_CURRENCY_NAMES_FAILURE,
    payload: {
      isLoadedCurrencyNames: false,
    },
  }
}

export const setCurrencyNames = (currencyNames) => {
  return {
    type: SET_CURRENCY_NAMES,
    payload: {
      currencyNames,
    },
  }
}

export const getLatestRate = (baseCurrency = 'USD') => {
  return (dispatch) => {
    return conversionAPI
      .getLatestCurrency(baseCurrency)
      .then((res) => {
        // debugger
        dispatch(getLatestRateSuccess())
        dispatch(setLatestRate(res.data.rates))
      })
      .catch((err) => {
        dispatch(getLatestRateFailure())
      })
  }
}

export const getCurrencyNames = () => {
  return (dispatch) => {
    return conversionAPI
      .getCurrencyNames()
      .then((res) => {
        // debugger
        dispatch(getCurrencyNamesSuccess())
        dispatch(setCurrencyNames(res.data))
      })
      .catch((err) => {
        dispatch(getCurrencyNamesFailure())
      })
  }
}
export default conversionReducer
