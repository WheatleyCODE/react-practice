import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'
import s from './AnswersList.module.css'

const AnswersList = (props) => {
  return (
    <ul className={s.AnswersList}>
      { props.answers.map((answer, index) => {
        return (
          <AnswerItem
            onAnswerClick={props.onAnswerClick}
            key={index}
            answer={answer}
            state={props.state ? props.state[answer.id]:null}
          />
        )
      })}
    </ul>
  )
}

export default AnswersList
