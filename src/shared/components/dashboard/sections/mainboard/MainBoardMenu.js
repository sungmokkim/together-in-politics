import React, { Component } from 'react';

import { connect } from 'react-redux';
import IndicatorBtn from '../../../common/IndicatorBtn';

class MainBoardMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <IndicatorBtn handleClick={this.props.handleClick} type='community' />
        <IndicatorBtn handleClick={this.props.handleClick} type='indicator' />
        <IndicatorBtn handleClick={this.props.handleClick} type='range' />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    dashboardManager: state.dashboardManager,
    data: state.dashboardData
  };
}
export default connect(mapStateToProps)(MainBoardMenu);
