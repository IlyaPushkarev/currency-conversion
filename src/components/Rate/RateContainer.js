import React from 'react'
import Rate from './Rate'
import { connect } from 'react-redux'
import { getCurrencyNames, getLatestRate } from '../../redux/conversion-reducer'
import { getCurrencyData } from '../../selectors/conversion-selectors'

class RateContainer extends React.Component {
  componentDidMount() {
    this.props.getRate()
    this.props.getCurrencyNames()
  }

  render() {
    return <Rate {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    currencyData: getCurrencyData(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRate: () => {
      dispatch(getLatestRate())
    },
    getCurrencyNames: () => {
      dispatch(getCurrencyNames())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateContainer)
