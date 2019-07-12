import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

class HeaderMenu extends Component {
  state = {
    btnClicked: false,
    modalDisplay: 'none',
    menuIsOn: false,
    portView: null,
    menuStatus: 'hide'
  };

  renderMenus = () => {
    return Object.keys(this.props.site.navDisplay).map((menu, index) => {
      return (
        <NavLink exact to={this.props.site.navDisplay[menu].linkTo} key={menu}>
          <span
            className={`menu-btn  ${this.state.menuStatus}`}
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
      this.handleClosingMenu();
    } else {
      document.body.style.overflowX = 'hidden';
      this.setState({
        ...this.state,
        menuIsOn: true,
        menuStatus: 'show',
        modalDisplay: 'block',
        btnClicked: true
      });
    }
  };

  handleClosingMenu = () => {
    this.setState(
      {
        ...this.state,
        menuIsOn: true,
        menuStatus: 'show',
        modalDisplay: 'block',
        btnClicked: false
      },
      async () => {
        await setTimeout(() => {
          this.setState({
            ...this.state,
            menuIsOn: false,
            menuStatus: 'hide',
            modalDisplay: 'none',
            btnClicked: false
          });
        }, 300);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={
            //render different animation depending on the current state
            this.state.btnClicked ? 'opacity-fade-in' : 'opacity-fade-out'
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
            display: this.state.modalDisplay
          }}
          onClick={this.handleClosingMenu}
        />
        <div className='menu-wrapper'>
          <div className='menu-toggler-container'>
            <span className='menu-toggler'>
              <i
                className={this.state.menuIsOn ? 'fas fa-times' : 'fas fa-bars'}
                style={{ fontSize: '4rem', color: 'white' }}
                onClick={this.handleClickingToggle}
              />
            </span>
          </div>
          <div
            className={`nav-menu-container ${
              this.state.btnClicked ? null : 'menu-fade-out'
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

export default connect(mapStateToProps)(HeaderMenu);
