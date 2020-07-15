import React from 'react'
import './App.module.css'
import { BrowserRouter, Route } from 'react-router-dom'
import styles from './App.module.css'
import RateContainer from './components/Rate/RateContainer'
import ConverterContainer from './components/Converter/ConvertContainer'
import HeaderContainer from './components/Header/HeaderContainer'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <HeaderContainer />
        <div className={styles.appWrapper__content}>
          <Route path={'/converter'} render={() => <ConverterContainer />} />
          <Route exact path={'/'} render={() => <RateContainer />} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
