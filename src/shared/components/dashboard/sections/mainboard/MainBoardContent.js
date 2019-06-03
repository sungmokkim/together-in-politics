import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeActive } from '../../../../actions/actions';
import { fetchDashboardData } from '../../../../actions/actions';
import { Line, HorizontalBar, Bar } from 'react-chartjs-2';

let width;

class MainBoardContent extends Component {
  state = {
    containerWidth: null
  };
  handleChange = selectedOption => {
    this.props.handleClick('range', selectedOption);
  };

  componentDidMount() {
    try {
      const containerWidth = document.getElementById(
        'mainboard-content-container'
      ).offsetWidth;
      this.setState({
        ...this.state,
        containerWidth: containerWidth
      });
    } catch (error) {}
  }
  getBarChart = () => {
    if (this.state.containerWidth) {
      if (this.state.containerWidth >= 900) {
        return (
          <Bar
            data={this.props.barChartData}
            options={{
              maintainAspectRatio: false,
              scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
            }}
          />
        );
      } else {
        return (
          <HorizontalBar
            data={this.props.barChartData}
            options={{
              maintainAspectRatio: false,
              scales: { xAxes: [{ ticks: { beginAtZero: true } }] }
            }}
          />
        );
      }
    } else {
      return;
    }
  };

  render() {
    const { active } = this.props.dashboardManager;

    return (
      <React.Fragment>
        <div className='line-chart'>
          <Line
            data={this.props.lineChartData}
            options={{
              maintainAspectRatio: false,
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
        </div>

        <div className='bar-chart'>{this.getBarChart()}</div>
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
