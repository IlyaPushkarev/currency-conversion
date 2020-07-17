import MockAdapter from 'axios-mock-adapter'
import API from '../api/api'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import conversionReducer, {
  GET_LATEST_RATE_FAILURE,
  GET_LATEST_RATE_SUCCESS,
  getLatestRate,
  SET_BASE_CURRENCY,
  SET_IS_LOADING,
  SET_LATEST_RATE,
  setBaseCurrency,
  setCurrencyNames,
  setIsLoading,
  setLatestRate,
} from './conversion-reducer'

describe('sync action creator for conversion-reducer', () => {
  it('should set isLoading true', () => {
    const isLoading = true
    const expectedAction = {
      type: SET_IS_LOADING,
      payload: {
        isLoading,
      },
    }
    expect(setIsLoading(isLoading)).toEqual(expectedAction)
  })
  it('should set baseCurrency "USD"', () => {
    const baseCurrency = 'USD'
    const expectedAction = {
      type: SET_BASE_CURRENCY,
      payload: {
        baseCurrency,
      },
    }
    expect(setBaseCurrency(baseCurrency)).toEqual(expectedAction)
  })
})

describe('conversion-reducer', () => {
  const state = {
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
  it('should set rate, which contains two fields', function () {
    let action = setLatestRate({
      first: '1',
      second: '2',
    })

    let newState = conversionReducer(state, action)

    expect(Object.keys(newState.rates).length).toEqual(2)
  })
  it('should set names of currency, which contains two fields', function () {
    let action = setCurrencyNames({
      USD: 'United State Dollar',
      CAD: 'Canadian Dollar',
    })

    let newState = conversionReducer(state, action)

    expect(Object.keys(newState.currencyNames).length).toEqual(2)
  })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
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
const ratesList = {
  USD: 123.43,
  RUB: 12.56,
  UAH: 26.76,
}
let mock

describe('async action creator for conversion-reducer', () => {
  let store
  beforeEach(() => {
    mock = new MockAdapter(API)
    store = mockStore(initialState)
  })

  it('get latest rate successfully', (done) => {
    const getLatestCurrencyMockSuccess = (baseOn) =>
      mock.onGet(`latest?base=${baseOn}`).reply(200, {
        rates: {
          USD: 123.43,
          RUB: 12.56,
          UAH: 26.76,
        },
      })

    const expectedActions = [
      {
        type: SET_IS_LOADING,
        payload: {
          isLoading: true,
        },
      },
      {
        type: SET_IS_LOADING,
        payload: {
          isLoading: false,
        },
      },
      {
        type: GET_LATEST_RATE_SUCCESS,
        payload: {
          isLoadedRate: true,
        },
      },
      {
        type: SET_LATEST_RATE,
        payload: {
          rates: ratesList,
        },
      },
    ]
    getLatestCurrencyMockSuccess('USD')

    return store.dispatch(getLatestRate('USD')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
  })

  it('get latest rate failure', (done) => {
    const getLatestCurrencyMockFailure = (baseOn) =>
      mock.onGet(`latest?base=${baseOn}`).reply(503, {
        error: 'Some error',
      })
    const expectedActions = [
      {
        type: SET_IS_LOADING,
        payload: {
          isLoading: true,
        },
      },
      {
        type: SET_IS_LOADING,
        payload: {
          isLoading: false,
        },
      },
      {
        type: GET_LATEST_RATE_FAILURE,
        payload: {
          isLoadedRate: false,
        },
      },
    ]

    getLatestCurrencyMockFailure('USD')

    return store.dispatch(getLatestRate('USD')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
  })
})
