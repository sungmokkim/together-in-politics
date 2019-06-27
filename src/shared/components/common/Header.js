import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import HeaderMenu from './HeaderMenu';
class Header extends Component {
  state = {
    menuIsOn: false,
    portView: null,
    menuStatus: null
  };

  renderMenus = () => {
    return Object.keys(this.props.site.navDisplay).map((menu, index) => {
      return (
        <NavLink exact to={this.props.site.navDisplay[menu].linkTo} key={menu}>
          <span
            className={`menu-btn for-desktop ${this.state.menuStatus}`}
            style={{
              opacity: 0,
              animation: `menu-fade-in 0.2s ease-in ${0.1 *
                (Object.keys(this.props.site.navDisplay).length -
                  (index + 1))}s forwards`
            }}
            onClick={this.handleClosingMenu}
          >
            {this.props.site.navDisplay[menu]['korean']}
          </span>
        </NavLink>
      );
    });
  };

  handleClickingToggle = () => {
    if (this.state.menuIsOn) {
      this.setState({
        ...this.state,
        menuIsOn: false,
        menuStatus: null
      });
    } else {
      this.setState({
        ...this.state,
        menuIsOn: true,
        menuStatus: 'show'
      });
    }
  };

  handleClosingMenu = () => {
    if (this.state.menuIsOn) {
      this.setState({
        ...this.state,
        menuIsOn: false,
        menuStatus: null
      });
    }
  };
  render() {
    return (
      <nav className='main-nav-wrapper'>
        <div className='section-global main-nav-container'>
          <Link to='/'>
            <span className='nav-title'>모두의 정치</span>
          </Link>

          <div className='menu-wrapper'>
            <div className='menu-toggler-container'>
              <span className='menu-toggler for-mobile'>
                <i
                  className={
                    this.state.menuIsOn ? 'fas fa-times' : 'fas fa-bars'
                  }
                  style={{ fontSize: '4rem', color: 'white' }}
                  onClick={this.handleClickingToggle}
                />
              </span>
            </div>
            <div className='nav-menu-container'>
              <HeaderMenu
                menuStatus={this.state.menuStatus}
                handleClosingMenu={this.handleClosingMenu}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.siteManager
  };
};

export default connect(mapStateToProps)(Header);
