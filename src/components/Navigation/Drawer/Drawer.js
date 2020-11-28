import React from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import s from './Drawer.module.css'

class Drawer extends React.Component {
  clickHandler = () => {
    this.props.onClose()
  }
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink 
            activeClassName={s.active} 
            exact={link.exact} 
            to={link.to}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }
  render() {
    const cls = [s.Drawer]

    if (!this.props.isOpen) {
      cls.push(s.close)
    }

    const links = [
      { to: '/', label: 'Пройти тест', exact: true, },
    ]

    console.log('uths', this.props.isAuthenticated)

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false, },)
      links.push({ to: '/logout', label: 'Выйти', exact: false, },)
    } else {
      links.push({ to: '/auth', label: 'Авторизация', exact: false, },)
    }

    return (
      <>
        <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks(links) }
        </ul>
        </nav>
        { this.props.isOpen ?  <Backdrop onClick={this.props.onClose} /> : null }
      </>
    )
  }
}

export default Drawer
