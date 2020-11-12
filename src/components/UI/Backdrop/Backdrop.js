import React from 'react'
import s from './Backdrop.module.css'

const Backdrop = (props) => (
  <div className={s.Backdrop} onClick={props.onClick} />
)

export default Backdrop