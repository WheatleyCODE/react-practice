import React from 'react'
import s from './AnswerItem.module.css'

const AnswerItem = (props) => {
  const classes = [s.AnswerItem,]
  if (props.state) {
    classes.push(s[props.state])
  }
  return (
    <li onClick={() => props.onAnswerClick(props.answer.id)} className={classes.join(' ')}>
      { props.answer.text }
    </li>
  )
}

export default AnswerItem
