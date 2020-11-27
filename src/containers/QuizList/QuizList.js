import React from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import s from './QuizList.module.css'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends React.Component {
  renderQuizes() {
    return this.props.quizes.map((quiz, index) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            <i className="far fa-question-circle" />
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }
  componentDidMount() {
    this.props.fetchQuizes()
  }
  render() {
    return(
      <div className={s.QuizList}>
        <div>
          <h1>Список тестов</h1>
          { this.props.loading
          ? <Loader /> 
          : <ul>
              { this.renderQuizes() }
            </ul>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
