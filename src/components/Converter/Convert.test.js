import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Converter from './Converter'
import styles from './Converter.module.css'

configure({ adapter: new Adapter() })

describe('Convert elements', () => {
  let props
  beforeEach(() => {
    props = {
      baseCurrency: 'USD',
      isLoading: false,
      currencyData: [],
      converts: [{ result: 123 }],
    }
  })

  it('when isLoading is true', () => {
    props = {
      ...props,
      isLoading: true,
    }

    const converter = shallow(<Converter {...props} />)

    expect(
      converter
        .find(`.${[styles['converter-result__preloader']].join(' ')}`)
        .text()
    ).toEqual('Компьютер счетает деньги')
  })
})

describe('Convert func', () => {
  let converter, props
  let convertCurrencyMock = jest.fn()
  props = {
    currencyData: [],
    converts: [],
    baseCurrency: 'USD',
    isLoading: false,
    convertCurrency: convertCurrencyMock,
  }

  beforeEach(() => {
    converter = shallow(<Converter {...props} />)
  })

  it('when submit data form successful', () => {
    // converter = shallow(<Converter {...props} />)
    // console.log(props)
    converter.find('form').simulate('submit', {
      preventDefault: () => {},
      currentTarget: {
        elements: {
          currencyFrom: { value: 'RUB' },
          currencyTo: { value: 'EUR' },
          inputValue: { value: 123 },
        },
      },
    })

    expect(convertCurrencyMock).toBeCalledTimes(1)
  })

  it('when two identical currencies are selected', () => {
    window.alert = jest.fn()

    converter.find('form').simulate('submit', {
      preventDefault: () => {},
      currentTarget: {
        elements: {
          currencyFrom: { value: 'EUR' },
          currencyTo: { value: 'EUR' },
          inputValue: { value: 123 },
        },
      },
    })

    expect(window.alert).toBeCalledTimes(1)
  })

  it('when value of currency is not inserted', function () {
    window.alert = jest.fn()

    converter.find('form').simulate('submit', {
      preventDefault: () => {},
      currentTarget: {
        elements: {
          currencyFrom: { value: 'RUB' },
          currencyTo: { value: 'EUR' },
          inputValue: { value: '' },
        },
      },
    })

    expect(window.alert).toBeCalledTimes(1)
    expect(converter.find('button').prop('disabled')).toBeTruthy()
  })
})
