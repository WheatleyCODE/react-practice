import React from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import s from './Drawer.module.css'

const links = [
  { to: '/', label: 'Пройти тест', exact: true, },
  { to: '/auth', label: 'Авторизация', exact: false, },
  { to: '/quiz-creator', label: 'Создать тест', exact: false, },
]

class Drawer extends React.Component {
  clickHandler = () => {
    this.props.onClose()
  }
  renderLinks() {
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

    return (
      <>
        <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks() }
        </ul>
        </nav>
        { this.props.isOpen ?  <Backdrop onClick={this.props.onClose} /> : null }
      </>
    )
  }
}

export default Drawer
