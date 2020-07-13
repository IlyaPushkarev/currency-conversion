import React from 'react'
import './App.module.css'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import styles from './App.module.css'
import RateContainer from './components/Rate/RateContainer'
import ConverterContainer from './components/Converter/ConvertContainer'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <Header />
        <div className={styles.appWrapper__content}>
          <Route path={'/converter'} render={() => <ConverterContainer />} />
          <Route exact path={'/'} render={() => <RateContainer />} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
