import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <div>
      <NavLink to="/">Rate</NavLink>
      <NavLink to="/converter">Converter</NavLink>
    </div>
  )
}

export default Header
