import React from 'react'
import styles from './Hamburget.module.css'
const Hamburger = (props) => {
  return (
    <button
      className={[
        styles['hamburger-button'],
        props.open ? styles['open'] : styles['close'],
      ].join(' ')}
      onClick={() => props.setOpen(!props.open)}
    >
      <div className={styles['hamburger-item']} />
      <div className={styles['hamburger-item']} />
      <div className={styles['hamburger-item']} />
    </button>
  )
}

export default Hamburger
