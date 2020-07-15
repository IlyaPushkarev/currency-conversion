import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rate from './Rate'
import styles from './Rate.module.css'

configure({ adapter: new Adapter() })

let props
let changeBaseCurrencyMock = jest.fn()
let setElectCurrencyMock = jest.fn()

describe('Rate elements', () => {
  beforeEach(() => {
    props = {
      changeBaseCurrency: changeBaseCurrencyMock,
      setElectCurrency: setElectCurrencyMock,
      isLoading: false,
      baseCurrency: 'USD',
      currencyData: [],
    }
  })

  it('should show message, that list of currency data is empty', function () {
    const rate = shallow(<Rate {...props} />)

    expect(rate.find(`.${styles['rate-body']}`).text()).toEqual(
      'List of currencies is empty'
    )
  })

  it('when isLoading is true', () => {
    props = {
      ...props,
      isLoading: true,
    }

    const rate = shallow(<Rate {...props} />)

    // expect(rate.find('div')).toHaveLength(1)
    expect(rate.children()).toHaveLength(1)
  })
})

describe('Rate func', () => {
  props = {
    changeBaseCurrency: changeBaseCurrencyMock,
    setElectCurrency: setElectCurrencyMock,
    isLoading: false,
    baseCurrency: 'USD',
    currencyData: [{ id: 'item-1', isElected: false }],
  }

  const rate = shallow(<Rate {...props} />)

  it('should call func setElectCurrency 1 time', function () {
    rate.find('#item-1').simulate('click', {
      currentTarget: {
        id: '#item-1',
      },
      target: {
        id: 'addElectCurrencyBtn',
      },
    })
    expect(setElectCurrencyMock).toHaveBeenCalledTimes(1)
  })
})
