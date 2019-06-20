import React, { Component } from 'react';

import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  state = {
    menuIsOn: false,
    portView: null,
    menuStatus: null
  };

  // componentDidMount() {
  //   const containerWidth = document.getElementById('root').offsetWidth;

  //   this.setState({
  //     ...this.state,
  //     portView: containerWidth > 600 ? 'desktop' : 'mobile',
  //     menuIsOn: containerWidth > 600 ? true : false
  //   });
  // }

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

          <div className='nav-menu-container'>
            <NavLink exact to='/'>
              <span
                className={`menu-btn menu-fade-in for-desktop ${
                  this.state.menuStatus
                }`}
                // style={{ display: this.state.menuIsOn ? 'inline' : 'none' }}
                onClick={this.handleClosingMenu}
              >
                Home
              </span>
            </NavLink>
            <NavLink to='/dashboard'>
              <span
                className={`menu-btn menu-fade-in for-desktop ${
                  this.state.menuStatus
                }`}
                onClick={this.handleClosingMenu}
              >
                Graphs
              </span>
            </NavLink>

            {/* <NavLink to='/freeboard'>
              <span
                className={`menu-btn menu-fade-in for-desktop ${
                  this.state.menuStatus
                }`}
                onClick={this.handleClosingMenu}
              >
                Board
              </span>
            </NavLink> */}

            <span className='menu-toggler for-mobile'>
              <i
                className={this.state.menuIsOn ? 'fas fa-times' : 'fas fa-bars'}
                style={{ fontSize: '4rem', color: 'white' }}
                onClick={this.handleClickingToggle}
              />
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
