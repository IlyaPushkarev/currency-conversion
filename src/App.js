import React from 'react'
import './App.module.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Converter from './components/Converter/Converter'

import Header from './components/Header/Header'
import styles from './App.module.css'
import RateContainer from './components/Rate/RateContainer'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <Header />
        <div className={styles.appWrapper__content}>
          <Route path={'/converter'} render={() => <Converter />} />
          <Route exact path={'/'} render={() => <RateContainer />} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
