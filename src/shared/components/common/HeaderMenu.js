import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
  }
  renderMenus = () => {
    return Object.keys(this.props.site.navDisplay).map((menu, index) => {
      return (
        <NavLink exact to={this.props.site.navDisplay[menu].linkTo} key={menu}>
          <span
            className={`menu-btn for-desktop ${this.props.menuStatus}`}
            style={{
              opacity: 0,
              animation: `menu-fade-in 0.2s ease-in ${0.1 *
                (Object.keys(this.props.site.navDisplay).length -
                  (index + 1))}s forwards`
            }}
            onClick={this.props.handleClosingMenu}
          >
            {this.props.site.navDisplay[menu]['korean']}
          </span>
        </NavLink>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className='menu-wrapper'>
          <div className='menu-toggler-container'>
            <span className='menu-toggler for-mobile'>
              <i
                className={this.props.menuIsOn ? 'fas fa-times' : 'fas fa-bars'}
                style={{ fontSize: '4rem', color: 'white' }}
                onClick={this.props.handleClickingToggle}
              />
            </span>
          </div>
          <div className='nav-menu-container'>{this.renderMenus()}</div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    site: state.siteManager
  };
};

export default connect(mapStateToProps)(HeaderMenu);
