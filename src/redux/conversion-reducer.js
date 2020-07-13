import _ from 'lodash'
import conversionAPI from '../api/conversionAPI'

export const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY'
export const SET_ELECT_CURRENCY = 'SET_ELECT_CURRENCY'
export const GET_LATEST_RATE_SUCCESS = 'GET_LATEST_RATE_SUCCESS'
export const GET_LATEST_RATE_FAILURE = 'GET_LATEST_RATE_FAILURE'
export const SET_LATEST_RATE = 'SET_LATEST_RATE'
export const GET_CURRENCY_NAMES_SUCCESS = 'GET_CURRENCY_NAMES_SUCCESS'
export const GET_CURRENCY_NAMES_FAILURE = 'GET_CURRENCY_NAMES_FAILURE'
export const SET_CURRENCY_NAMES = 'SET_CURRENCY_NAMES'
export const GET_CONVERT_SUCCESS = 'GET_CONVERT_SUCCESS'
export const GET_CONVERT_FAILURE = 'GET_CONVERT_FAILURE'
export const SET_CONVERT_RESULT = 'SET_CONVERT_RESULT'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
  isLoading: false,
  isLoadedRate: null,
  rates: {},
  isLoadedCurrencyNames: null,
  currencyNames: {},
  baseCurrency: 'USD',
  electCurrency: [],
  isConvert: null,
  historyConvert: [],
}

const conversionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_RATE_SUCCESS:
    case GET_LATEST_RATE_FAILURE:
    case GET_CURRENCY_NAMES_SUCCESS:
    case GET_CURRENCY_NAMES_FAILURE:
    case SET_BASE_CURRENCY:
    case GET_CONVERT_SUCCESS:
    case GET_CONVERT_FAILURE:
    case SET_IS_LOADING: {
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

    case SET_ELECT_CURRENCY: {
      return {
        ...state,
        electCurrency: [...state.electCurrency, action.payload.electCurrency],
      }
    }

    case SET_CONVERT_RESULT: {
      return {
        ...state,
        historyConvert: [...state.historyConvert, action.payload.result],
      }
    }
    default: {
      return state
    }
  }
}

export const setIsLoading = (isLoading) => {
  return {
    type: SET_IS_LOADING,
    payload: {
      isLoading,
    },
  }
}

export const setBaseCurrency = (baseCurrency) => {
  return {
    type: SET_BASE_CURRENCY,
    payload: {
      baseCurrency,
    },
  }
}

export const changeBaseCurrency = (baseCurrency) => {
  return (dispatch) => {
    dispatch(setBaseCurrency(baseCurrency))
    dispatch(getLatestRate(baseCurrency))
  }
}
export const setElectCurrency = (electCurrency) => {
  return {
    type: SET_ELECT_CURRENCY,
    payload: {
      electCurrency,
    },
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

export const getConvertSuccess = () => {
  return {
    type: GET_CONVERT_SUCCESS,
    payload: {
      isConvert: true,
    },
  }
}

export const getConvertFailure = () => {
  return {
    type: GET_CONVERT_FAILURE,
    payload: {
      isConvert: false,
    },
  }
}

export const setConvertResult = (convertObj) => {
  return {
    type: SET_CONVERT_RESULT,
    payload: {
      result: convertObj,
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

export const getLatestRate = (baseCurrency) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return conversionAPI
      .getLatestCurrency(baseCurrency)
      .then((res) => {
        // debugger
        dispatch(setIsLoading(false))
        dispatch(getLatestRateSuccess())
        dispatch(setLatestRate(res.data.rates))
      })
      .catch((err) => {
        dispatch(setIsLoading(false))
        dispatch(getLatestRateFailure())
      })
  }
}

export const getCurrencyNames = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return conversionAPI
      .getCurrencyNames()
      .then((res) => {
        // debugger
        dispatch(setIsLoading(false))
        dispatch(getCurrencyNamesSuccess())
        dispatch(setCurrencyNames(res.data))
      })
      .catch((err) => {
        dispatch(setIsLoading(false))
        dispatch(getCurrencyNamesFailure())
      })
  }
}

export const convertCurrency = (val, from, to) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return conversionAPI
      .convert(val, from, to)
      .then((res) => {
        dispatch(setIsLoading(false))
        dispatch(getConvertSuccess())
        const temp = res.data.rates[to]
        // debugger
        const obj = {
          date: res.data.date,
          val,
          from,
          to,
          result: val * temp,
        }
        dispatch(setConvertResult(obj))
      })
      .catch((err) => {
        dispatch(setIsLoading(false))
        dispatch(getConvertFailure())
      })
  }
}
export default conversionReducer
