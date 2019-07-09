import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainBoard from './MainBoard';
import CurrentStatus from '../../../common/CurrentStatus';

class MainBoardSection extends Component {
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
        />
        <section className='section-global'>
          <MainBoard />
        </section>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    dashboardManager: state.dashboardManager
  };
}
export default connect(mapStateToProps)(MainBoardSection);
