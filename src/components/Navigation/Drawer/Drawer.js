import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import s from './Drawer.module.css'

const links = [
  1, 2, 3,
]

class Drawer extends React.Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href="#go">Link {link}</a>
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
