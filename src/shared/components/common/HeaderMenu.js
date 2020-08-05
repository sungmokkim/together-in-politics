import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DescriptionBtn from './DescriptionBtn';
import { toggleStatus } from '../../actions/actions';

class HeaderMenu extends Component {
  renderMenus = () => {
    return Object.keys(this.props.site.navDisplay).map((menu, index) => {
      return (
        <NavLink exact to={this.props.site.navDisplay[menu].linkTo} key={menu}>
          <span
            className={`menu-btn  ${
              this.props.site.menu.componentDisplay ? 'show' : 'hide'
            }`}
            style={{
              opacity: 0,
              animation: `menu-fade-in 0.2s ease-in ${0.1 *
                (Object.keys(this.props.site.navDisplay)?.length ?? 0 -
                  (index + 1))}s forwards`
            }}
            onClick={() => {
              this.props.controlModalFadeOut('menu');
            }}
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
        <div
          className={
            //render different animation depending on the current state
            this.props.site.menu.clicked
              ? 'opacity-fade-in'
              : 'opacity-fade-out'
          }
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            zIndex: '2',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            // only display dark overlay when button is clicked
            display: this.props.site.menu.modalDisplay ? 'block' : 'none'
          }}
          onClick={() => {
            this.props.controlModalFadeOut('menu');
          }}
        />
        <div className='menu-wrapper'>
          {/* description(about)button */}
          <DescriptionBtn
            btnClicked={this.props.site.description.clicked}
            hide={this.props.site.menu.modalDisplay} // hide this button when menu modal displays
            handleClick={this.props.toggleBtn}
            toggleType='description'
          />
          {/* menu toggle button */}
          <div className='menu-toggler-container'>
            <div
              className='menu-toggler'
              onClick={() => {
                this.props.toggleBtn('menu');
              }}
            >
              <i
                className={
                  this.props.site.menu.clicked ? 'fas fa-times' : 'fas fa-bars'
                }
              />
            </div>
          </div>
          {/* actual menu display */}
          <div
            className={`nav-menu-container ${
              this.props.site.menu.clicked ? null : 'menu-fade-out'
            }`}
          >
            {this.renderMenus()}
          </div>
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

export default connect(
  mapStateToProps,
  { toggleStatus }
)(HeaderMenu);
