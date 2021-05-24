import React from 'react'
import Layout from './hoc/Layout/Layout' // компонент верстки
import Quiz from './containers/Quiz/Quiz' // компонент викторины
import { Redirect, Route, Switch, withRouter } from 'react-router-dom' // роутеры 
import QuizList from './containers/QuizList/QuizList' // компонент списка вопрососв
import QuizCreator from './containers/QuizCreator/QuizCreator' // компонент списка создания вопросов
import Auth from './containers/Auth/Auth' // страница аундификации

import './App.css' // стили
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout' // компоненты логаута
import { autoLogin } from './store/actions/auth' // компоненты автологина

// приложение
class App extends React.Component {
  // при первом рендеринне костануть автологин если пользователь в системе
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    // Роуты и редирект разные под пользоватея зареганого и нет
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" exact component={QuizList}/>
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path="/" exact component={QuizList}/>
          <Redirect to="/" />
        </Switch>
      )
    }
    // возврат верстки и роутеров в ней
    return(
      <Layout>
      { routes }
      </Layout>
    )
  }
}

// получаем данные пользователь вошел или нет
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

// Получаем метод автологина
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
