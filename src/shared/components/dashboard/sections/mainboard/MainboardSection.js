import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainBoard from './MainBoard';
import { toggleStatus } from '../../../../actions/actions';
import CurrentStatus from '../../../common/CurrentStatus';

class MainBoardSection extends Component {
  state = {
    modalDisplay: 'none',
    componentDisplay: false
  };

  // below 2 functions are needed to display modal(dark overlay) when one of the two conditions is met
  // 1. a user clicks a setting (config ) button
  // 2. a user clicks a status card
  // to do both, these functions need to be where these 2 conditions can be controlled
  toggleBtn = () => {
    if (this.props.site.statusClicked) {
      this.controlModalFadeOut();
    } else {
      this.props.toggleStatus();
      this.setState({
        ...this.state,
        modalDisplay: 'block',
        componentDisplay: true
      });
    }
  };

  controlModalFadeOut = () => {
    // document.body.style.overflow = 'auto';
    this.props.toggleStatus();
    // give delay of 0.3s to perform fade-out animation
    this.setState(
      {
        ...this.state,
        modalDisplay: 'block',
        componentDisplay: true
      },
      async () => {
        const delayModal = await setTimeout(() => {
          this.setState({
            ...this.state,
            modalDisplay: 'none',
            componentdisplay: false
          });
        }, 300);
      }
    );
  };

  render() {
    const { active } = this.props.dashboardManager;
    return (
      <React.Fragment>
        <CurrentStatus
          list={[
            {
              icon: 'fas fa-chart-bar',
              status: active.chart['korean']
            },
            {
              icon: 'fas fa-tasks',
              status: active.community['korean']
            },
            {
              icon: 'fas fa-filter',
              status: active.mentionPortion['korean']
            }
          ]}
          handleClick={this.toggleBtn}
        />
        <section className='section-global'>
          <MainBoard
            clicked={this.props.site.statusClicked}
            modalDisplay={this.state.modalDisplay}
            componentDisplay={this.state.componentDisplay}
            controlModalFadeOut={this.controlModalFadeOut}
            toggleBtn={this.toggleBtn}
          />
        </section>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    site: state.siteManager,
    dashboardManager: state.dashboardManager
  };
}
export default connect(
  mapStateToProps,
  { toggleStatus }
)(MainBoardSection);
