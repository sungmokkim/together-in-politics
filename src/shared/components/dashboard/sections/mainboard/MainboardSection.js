import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainBoard from './MainBoard';
import { toggleStatus } from '../../../../actions/actions';
import CurrentStatus from '../../../common/CurrentStatus';

class MainBoardSection extends Component {
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
    const { active } = this.props.dashboardManager;
    return (
      <React.Fragment>
        <CurrentStatus
          list={[
            {
              icon: 'fas fa-chart-bar',
              status: active.chart['korean']
            },

            active.chart.index === 'line'
              ? {
                  icon: 'fas fa-tasks',
                  status: active.community['korean']
                }
              : {
                  icon: 'far fa-clock',
                  status: active.bubblePeriod['korean']
                },
            active.chart.index === 'line'
              ? {
                  icon: 'fas fa-filter',
                  status: active.mentionPortion['korean']
                }
              : null
          ]}
          handleClick={this.toggleBtn}
          toggleType='status'
        />
        <section className='section-global'>
          <MainBoard
            clicked={this.props.site.status.clicked}
            modalDisplay={this.props.site.status.modalDisplay}
            componentDisplay={this.props.site.status.componentDisplay}
            controlModalFadeOut={this.controlModalFadeOut}
            toggleBtn={this.toggleBtn}
            toggleType='status'
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
