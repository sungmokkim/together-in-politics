import React, { Component } from 'react';
import IndicatorSelectButton from '../../../common/IndicatorSelectButton';
import { connect } from 'react-redux';
import { changeActive } from '../../../../actions/actions';
import Select from 'react-select';
import { fetchDashboardData } from '../../../../actions/actions';
import { Line, HorizontalBar } from 'react-chartjs-2';

class MainBoardContent extends Component {
  handleChange = selectedOption => {
    this.props.handleClick('range', selectedOption);
  };

  render() {
    const {
      active,
      dashboardIndicators,
      rangeOptions
    } = this.props.dashboardManager;

    const indicatorsMapped = Object.keys(dashboardIndicators).map(
      indicatorName => {
        return (
          <li key={dashboardIndicators[indicatorName]}>
            <IndicatorSelectButton
              title={indicatorName}
              activate={dashboardIndicators[indicatorName]}
              type='indicator'
              isActive={
                active.indicator === dashboardIndicators[indicatorName]
                  ? true
                  : false
              }
              handleClick={this.props.handleClick}
            />
          </li>
        );
      }
    );

    return (
      <React.Fragment>
        <ul>{indicatorsMapped}</ul>

        {/* <canvas id='chart-canvas' width='800px' height='500px' /> */}
        <Line
          data={this.props.lineChartData}
          width={800}
          height={400}
          options={{
            scales: {
              yAxes: [
                {
                  // ,
                  ticks: {
                    reverse: active.indicator === 'real_rank' ? true : false
                    // max: 1,
                    // min: 0,
                    // stepSize: 0.1
                  }
                }
              ]
            }
          }}
        />

        <Select
          name='range'
          value={active.range}
          onChange={this.handleChange}
          options={rangeOptions}
        />

        <HorizontalBar
          data={this.props.barChartData}
          options={{ scales: { xAxes: [{ ticks: { beginAtZero: true } }] } }}
        />
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

export default connect(
  mapStateToProps,
  { changeActive, fetchDashboardData }
)(MainBoardContent);
