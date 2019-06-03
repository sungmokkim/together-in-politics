import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default () => {
  return (
    <nav className='main-nav-wrapper'>
      <div className='section-global main-nav-container'>
        <Link to='/'>
          <span className='nav-title' />
        </Link>

        <div className='nav-menu-container'>
          <NavLink exact to='/'>
            <span className='menu-btn'>Home </span>
          </NavLink>
          <NavLink to='/dashboard'>
            <span className='menu-btn'>Graphs</span>
          </NavLink>

          {/* <NavLink to='/test'>
            <span>test</span>
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
};
