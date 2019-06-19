import React, { Component } from 'react';

import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  state = {
    menuIsOn: true,
    portView: null
  };

  componentDidMount() {
    const containerWidth = document.getElementById('root').offsetWidth;

    this.setState({
      ...this.state,
      portView: containerWidth > 600 ? 'desktop' : 'mobile',
      menuIsOn: containerWidth > 600 ? true : false
    });
  }

  handleClick = () => {
    this.setState({
      ...this.state,
      menuIsOn: !this.state.menuIsOn
    });
  };

  handleClosingMenu = () => {
    if (this.state.portView === 'mobile') {
      this.setState({
        ...this.state,
        menuIsOn: false
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
                className={`menu-btn ${
                  this.state.menuIsOn ? 'selection-fade-in' : null
                }`}
                style={{ display: this.state.menuIsOn ? 'inline' : 'none' }}
                onClick={this.handleClosingMenu}
              >
                Home
              </span>
            </NavLink>
            <NavLink to='/dashboard'>
              <span
                className={`menu-btn ${
                  this.state.menuIsOn ? 'selection-fade-in' : null
                }`}
                style={{ display: this.state.menuIsOn ? 'inline' : 'none' }}
                onClick={this.handleClosingMenu}
              >
                Graphs
              </span>
            </NavLink>

            {/* <NavLink to='/freeboard'>
              <span
                className={`menu-btn ${
                  this.state.menuIsOn ? 'selection-fade-in' : null
                }`}
                style={{ display: this.state.menuIsOn ? 'inline' : 'none' }}
                onClick={this.handleClosingMenu}
              >
                Board
              </span>
            </NavLink> */}

            <span
              className='menu-toggler'
              style={{
                display: this.state.portView === 'desktop' ? 'none' : 'block'
              }}
            >
              <i
                className={this.state.menuIsOn ? 'fas fa-times' : 'fas fa-bars'}
                style={{ fontSize: '3rem', color: 'white' }}
                onClick={this.handleClick}
              />
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
