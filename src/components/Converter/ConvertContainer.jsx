import React from 'react'
import Converter from './Converter'
import { connect } from 'react-redux'
import { getCurrencyData } from '../../selectors/conversion-selectors'
import {
  convertCurrency,
  getCurrencyNames,
  getLatestRate,
} from '../../redux/conversion-reducer'

class ConverterContainer extends React.Component {
  componentDidMount() {
    if (this.props.currencyData.length) {
    } else {
      // debugger
      this.props.getRate(this.props.baseCurrency)
      this.props.getCurrencyNames()
    }
  }

  render() {
    return <Converter {...this.props} />
  }
}
const mapStateToProps = (state) => {
  return {
    currencyData: getCurrencyData(state),
    converts: state.conversion.historyConvert,
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
    convertCurrency: (val, from, to) => {
      dispatch(convertCurrency(val, from, to))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)
