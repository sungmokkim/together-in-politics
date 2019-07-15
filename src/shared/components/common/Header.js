import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import { toggleStatus } from '../../actions/actions';
import IndexDescription from './IndexDescription';

class Header extends Component {
  // below 2 functions are needed to display modal(dark overlay) when one of the two conditions is met
  // 1. a user clicks a  button
  // 2. a user clicks a status card
  // to do both, these functions need to be where these 2 conditions can be controlled
  toggleBtn = toggleType => {
    if (this.props.site[toggleType].clicked) {
      // if it's already clicked, execute closing function
      this.controlModalFadeOut(toggleType);
    } else {
      // if it is not clicked, activate all these three
      this.props.toggleStatus({ toggleType, toggleComponent: 'clicked' });
      this.props.toggleStatus({ toggleType, toggleComponent: 'modalDisplay' });
      this.props.toggleStatus({
        toggleType,
        toggleComponent: 'componentDisplay'
      });
    }
  };

  controlModalFadeOut = async toggleType => {
    // this is closing function

    // change 'clicked' status first (to perform 'fade-out' animation first)
    this.props.toggleStatus({ toggleType, toggleComponent: 'clicked' });

    // give delay of 0.3s to perform fade-out animation
    const delayModal = await setTimeout(() => {
      // deactivate these two after the time out
      this.props.toggleStatus({ toggleType, toggleComponent: 'modalDisplay' });
      this.props.toggleStatus({
        toggleType,
        toggleComponent: 'componentDisplay'
      });
    }, 300);
  };

  render() {
    return (
      <React.Fragment>
        <nav className='main-nav-wrapper'>
          <div className='section-global main-nav-container'>
            <Link to='/'>
              <span className='nav-title'>
                모두의 정치 <span className='beta'>Beta</span>
              </span>
            </Link>

            <HeaderMenu
              controlModalFadeOut={this.controlModalFadeOut}
              toggleBtn={this.toggleBtn}
            />
          </div>
        </nav>

        <IndexDescription
          clicked={this.props.site.description.clicked}
          modalDisplay={this.props.site.description.modalDisplay}
          componentDisplay={this.props.site.description.componentDisplay}
          controlModalFadeOut={this.controlModalFadeOut}
          toggleBtn={this.toggleBtn}
          toggleType='description'
          list={this.props.dashboardManager.descriptionOptions}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.siteManager,
    dashboardManager: state.dashboardManager
  };
};

export default connect(
  mapStateToProps,
  { toggleStatus }
)(Header);
