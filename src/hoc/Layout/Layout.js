import React from 'react'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import s from './Layout.module.css'
import { connect } from 'react-redux'

class Layout extends React.Component {
  state = {
    showNemu: false
  }
  toggleMenuHandler = () => {
    this.setState({
      showNemu: !this.state.showNemu
    })
  }
  menuCloseHandler = () => {
    this.setState({
      showNemu: false
    })
  }
  render() {
    return (
      <div className={s.Layout}>
        <Drawer
          isOpen={this.state.showNemu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.showNemu}
        />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

export default connect(mapStateToProps)(Layout)
