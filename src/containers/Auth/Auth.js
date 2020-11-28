import React from 'react'
import Buttom from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import s from './Auth.module.css'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

class Auth extends React.Component {

  state = {
    isFormFalid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        placeholder: 'Введите почту',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введите корректный password',
        placeholder: 'Введите пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    }
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
      // is js для валидации библиотека
      isValid = validateEmail(value) && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormFalid = true

    Object.keys(formControls).forEach((name) => {
      isFormFalid = formControls[name].valid && isFormFalid
    })

    this.setState({
      formControls,
      isFormFalid,
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          placeholder={control.placeholder}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true,
    )
  }
  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false,
    )
  }

  submitHandler = (event) => {
    event.preventDefault()
  }
  render() {
    return (
      <div className={s.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={s.AuthForm} onSubmit={this.submitHandler}>
            { this.renderInputs() }
            <Buttom disabled={!this.state.isFormFalid} type="success" onClick={this.loginHandler}>Войти</Buttom>
            <Buttom disabled={!this.state.isFormFalid} type="primary" onClick={this.registerHandler}>Регистрация</Buttom>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)