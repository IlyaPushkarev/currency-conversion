import React from 'react'
import Rate from './Rate'
import { connect } from 'react-redux'
import {
  changeBaseCurrency,
  getCurrencyNames,
  getLatestRate,
  setElectCurrency,
} from '../../redux/conversion-reducer'
import { getCurrencyData } from '../../selectors/conversion-selectors'

class RateContainer extends React.Component {
  componentDidMount() {
    // debugger
    if (this.props.currencyData.length) {
    } else {
      // debugger
      this.props.getRate(this.props.baseCurrency)
      this.props.getCurrencyNames()
    }
  }

  render() {
    return <Rate {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    currencyData: getCurrencyData(state),
    baseCurrency: state.conversion.baseCurrency,
    isLoading: state.conversion.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRate: (baseCurrency) => {
      dispatch(getLatestRate(baseCurrency))
    },
    getCurrencyNames: () => {
      dispatch(getCurrencyNames())
    },
    changeBaseCurrency: (baseCurrency) => {
      dispatch(changeBaseCurrency(baseCurrency))
    },
    setElectCurrency: (electCurrency) => {
      dispatch(setElectCurrency(electCurrency))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateContainer)
