import React, { Component } from 'react';

import { connect } from 'react-redux';
import IndicatorBtn from '../../../common/IndicatorBtn';
import CheckBtn from '../../../common/CheckBtn';

class MainBoardMenu extends Component {
  getBarChartMenus = () => {
    return (
      <React.Fragment>
        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='chart'
          valueIsObject={true}
        />
        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='community'
          valueIsObject={true}
        />

        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='barPeriod'
          valueIsObject={true}
        />
      </React.Fragment>
    );
  };

  getLineChartMenus = () => {
    return (
      <React.Fragment>
        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='chart'
          valueIsObject={true}
        />

        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='community'
          valueIsObject={true}
        />

        <CheckBtn
          handleClick={this.props.handleCheck}
          type='indicator'
          valueIsObject={true}
        />
        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='range'
          valueIsObject={true}
        />
        {this.props.dashboardManager.active.indicator !== 'popularity' ? (
          <IndicatorBtn
            handleClick={this.props.handleClick}
            type='mentionPortion'
            valueIsObject={true}
          />
        ) : null}
      </React.Fragment>
    );
  };

  getBubbleChartMenus = () => {
    return (
      <React.Fragment>
        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='chart'
          valueIsObject={true}
        />
        <IndicatorBtn
          handleClick={this.props.handleClick}
          type='bubblePeriod'
          valueIsObject={true}
        />
      </React.Fragment>
    );
  };

  getMenus = () => {
    switch (this.props.dashboardManager.active.chart.index) {
      case 'bar':
        return this.getBarChartMenus();
      case 'line':
        return this.getLineChartMenus();

      case 'bubble':
        return this.getBubbleChartMenus();
      default:
        return;
    }
  };
  render() {
    return <React.Fragment>{this.getMenus()}</React.Fragment>;
  }
}
function mapStateToProps(state) {
  return {
    dashboardManager: state.dashboardManager,
    data: state.dashboardData
  };
}
export default connect(mapStateToProps)(MainBoardMenu);
