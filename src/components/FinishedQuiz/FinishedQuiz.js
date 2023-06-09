import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button'
import s from './FinishedQuiz.module.css'

const FinishedQuiz = (props) => {
  console.log(props)
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={s.FinishedQuiz}>
      <ul>
        { props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            s[props.results[quizItem.id]]
          ]
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      <div>
        <Button type={'primary'} onClick={props.onRetry}>Повторить</Button>
        <Link to='/'>
          <Button type={'success'}>Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}
export default FinishedQuiz
