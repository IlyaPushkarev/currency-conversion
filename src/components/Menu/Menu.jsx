import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.css'
import Hamburger from './Hamburger'

const Menu = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className={[styles['navigation']].join(' ')}>
        <NavLink
          exact
          activeClassName={styles['active_tab']}
          className={styles['navigation__item']}
          to="/"
        >
          Rate
        </NavLink>
        <NavLink
          activeClassName={styles['active_tab']}
          className={styles['navigation__item']}
          to="/converter"
        >
          Converter
        </NavLink>
      </nav>

      <div className={styles['menu-wrapper']}>
        <nav
          className={[
            styles['navbar'],
            open ? styles['display-flex'] : styles['display-none'],
          ].join(' ')}
        >
          <NavLink
            exact
            activeClassName={styles['active_tab']}
            className={styles['navigation__item']}
            to="/"
            onClick={() => close()}
          >
            Rate
          </NavLink>
          <NavLink
            activeClassName={styles['active_tab']}
            className={styles['navigation__item']}
            to="/converter"
            onClick={() => close()}
          >
            Converter
          </NavLink>
        </nav>
        <Hamburger open={open} setOpen={setOpen} />
      </div>
    </>
  )
}

export default Menu
