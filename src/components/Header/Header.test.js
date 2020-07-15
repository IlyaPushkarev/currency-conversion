import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from './Header'

configure({ adapter: new Adapter() })

let changeBaseCurrencyMock = jest.fn()

describe('Header elements', () => {
  let props
  beforeEach(() => {
    props = {
      baseCurrency: 'USD',
      isLoading: true,
    }
  })

  it('should contain tag select', function () {
    const header = shallow(<Header {...props} />)

    expect(header.find('select')).toHaveLength(1)
  })
})

describe('Header funcs', () => {
  let props
  let header

  beforeEach(() => {
    props = {
      baseCurrency: 'USD',
      isLoading: true,
      changeBaseCurrency: changeBaseCurrencyMock,
    }
    header = shallow(<Header {...props} />)
  })

  it('should call func changeBaseCurrency 1 time', function () {
    header.find('select').simulate('change', {
      currentTarget: {
        value: 'EUR',
        blur: () => {},
      },
    })

    expect(changeBaseCurrencyMock).toHaveBeenCalledTimes(1)
  })
})
