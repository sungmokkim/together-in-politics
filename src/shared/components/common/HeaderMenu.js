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
    return <React.Fragment>{this.renderMenus()}</React.Fragment>;
  }
}
const mapStateToProps = state => {
  return {
    site: state.siteManager
  };
};

export default connect(mapStateToProps)(HeaderMenu);
