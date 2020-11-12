import React from 'react'
import AnswersList from './AnswersList/AnswersList'
import s from './ActiveQuiz.module.css'

const ActiveQuiz = (props) => {
  return (
    <div className={s.ActiveQuiz}>
      <p className={s.Question}>
        <span>
          <strong>{props.answerNumber}. </strong>
          { props.question }
        </span>
        <small>{props.answerNumber} из {props.quizLength}</small>
      </p>
      <AnswersList
        state={props.state}
        onAnswerClick={props.onAnswerClick}
        answers={props.answers}
      />
    </div>
  )
}

export default ActiveQuiz
