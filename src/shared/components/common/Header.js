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

  render() {
    return (
      <nav className='main-nav-wrapper'>
        <div className='section-global main-nav-container'>
          <Link to='/'>
            <span className='nav-title'>
              모두의 정치 <span className='beta'>Beta</span>
            </span>
          </Link>

          <HeaderMenu />
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
