import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import s from './Quiz.module.css'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnewerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends React.Component {
  retryHandler = () => {
    this.setState({
     
    })
  }
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.retryQuiz()
  }
  render() {
    return(
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          { this.props.loading || !this.props.quiz
              ? <Loader />
              : this.props.isFinished
              ? <FinishedQuiz
                  results={this.props.results}  
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
              : <ActiveQuiz
                  question={this.props.quiz[this.props.activeQuestion].question} 
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  onAnswerClick={this.props.quizAnewerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answersState}
                />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answersState: state.quiz.answersState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading, 
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnewerClick: (answerId) => dispatch(quizAnewerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
