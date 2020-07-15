import React from 'react'
import Header from './Header'
import { changeBaseCurrency } from '../../redux/conversion-reducer'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    baseCurrency: state.conversion.baseCurrency,
    isLoading: state.conversion.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeBaseCurrency: (baseCurrency) => {
      dispatch(changeBaseCurrency(baseCurrency))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
