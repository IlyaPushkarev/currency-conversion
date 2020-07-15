import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import styles from './App.module.css'
import App from './App'

configure({ adapter: new Adapter() })

describe('App', () => {
  it('should render div.appWrapper ', function () {
    const app = shallow(<App />)

    expect(app.find(`.${styles.appWrapper}`)).toHaveLength(1)
  })
})
