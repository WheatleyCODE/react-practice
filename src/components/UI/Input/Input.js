import React from 'react'
import s from './Input.module.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [s.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(s.invalid)
  }

  return (
    <div className={cls.join(' ')}> 
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      { isInvalid(props) ? <span>{props.errorMessage}</span> : null}
    </div>
  )
}

export default Input
