import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainBoardMenu from './MainBoardMenu';
import MainBoardContent from './MainBoardContent';
import {
  changeActive,
  fetchDashboardData,
  fetchPeriodData,
  fetchBubbleData,
  fetchTodayIndicators,
  toggleIndicator
} from '../../../../actions/actions';

class MainBoard extends Component {
  state = {
    chart: null,
    chartIsLoading: false,

    lineChartData: {
      labels: [],

      dataObj: {}
    },

    barChartData: {
      labels: [],
      dataArray: []
    },

    bubbleChartData: [],
    firstTimeLoaded: true
  };

  updateLineChart = (inputData = null) => {
    const { active, lineChartIndicatorOptions } = this.props.dashboardManager;

    let dataToMap;

    if (inputData) {
      dataToMap = inputData;
    } else {
      dataToMap = this.props.data.dashboardData;
    }

    // map dates into a single array (used as x axis in graph)
    const datesInArray = dataToMap.map(data => {
      return `${data.years}-${data.months}`;
    });

    // the following two functions will reduce the coming array(raw data) twice
    // first one is to actually map each indicator's data in a respective array (an object with each key containing each array)
    // second one is to re-structure it to another object each with the data combined with chart configuration
    // These steps are needed because the line graph should display only when the corresponding indicator's check-status is true
    // checking status will take place in MainBoardContent.js
    const dataObj = dataToMap.reduce((acc, val) => {
      Object.keys(lineChartIndicatorOptions).forEach(key => {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(val[key].toFixed(2));
      });

      return acc;
    }, {});

    const newDataObj = Object.keys(dataObj).reduce((acc, val) => {
      if (!acc[val]) {
        acc[val] = {};
      }

      acc[val] = {
        data: dataObj[val],
        label: lineChartIndicatorOptions[val]['korean'],
        fill: false,
        backgroundColor: lineChartIndicatorOptions[val]['lineColor'],
        borderColor: lineChartIndicatorOptions[val]['lineColor'],
        pointHoverBorderWidth: 10,
        lineTension: 0.1
      };
      return acc;
    }, {});

    this.setState({
      ...this.state,
      chartIsLoading: false, // turn off chart loading component (it was turned on in higher order function)
      lineChartData: {
        labels: datesInArray,
        dataObj: newDataObj // set data in state
      }
    });
  };

  updateBarChart = (inputData = null) => {
    let dataToMap;

    if (inputData) {
      dataToMap = inputData;
    } else {
      dataToMap = this.props.data.periodData;
    }

    const datesInArray = dataToMap.map(data => {
      let value;

      if (data.weeks) {
        value = data.years + ' Week ' + data.weeks;
      } else if (data.months) {
        value = data.years + '-' + data.months;
      } else {
        value = data.years;
      }

      return value;
    });
    const dataInArray = dataToMap.map(data => {
      return data.anti_count.toFixed(2);
    });

    this.setState({
      ...this.state,
      chartIsLoading: false,
      barChartData: {
        labels: datesInArray,
        dataArray: dataInArray
      }
    });
  };

  updateBubbleChart = (inputData = null) => {
    let dataToMap;

    const { communities } = this.props.dashboardManager;
    if (inputData) {
      dataToMap = inputData;
    } else {
      dataToMap = this.props.data.bubbleData;
    }

    const dataInArray = dataToMap.map(data => {
      return {
        label: [communities[data.name]['korean']],
        backgroundColor: communities[data.name]['color'],
        borderColor: communities[data.name]['color'],
        title: communities[data.name]['korean'], //adding the title you want to show
        data: [
          {
            x: (data.anti_ratio * 100).toFixed(2),
            y: (
              (data.femi_ratio / communities[data.name]['femiWeight']) *
              100
            ).toFixed(2),
            r: (data.w_count / 10000).toFixed(2)
          }
        ]
      };
    });

    this.setState({
      ...this.state,
      chartIsLoading: false,
      bubbleChartData: dataInArray
    });
  };

  fetchAndUpdateCharts = () => {
    // this function is to
    // 1. change state 'contentIsLoading' to true
    // 2. in browser, loading component will display
    // 3. start fetching data through action
    // 4. do necessary mapping or editing(if needed)
    // 5. change state 'contentIsLoading' back to false
    // 6. loading component disappears
    // 7. fetched content will display
    const { active, latestDate, communities } = this.props.dashboardManager;

    this.setState(
      {
        ...this.state,
        chartIsLoading: true
        // turn on chart loading component to display loading effect(it will be turned off soon as data are fetched and the chart is updated)
      },
      () => {
        // call back after setState to make sure state change was implemented
        switch (active.chart.index) {
          // update chart data differently according to currently active chart
          case 'bar':
            this.props
              .fetchPeriodData(active) // fetch period data before updating bar chart
              .then(fetchedData => this.updateBarChart(fetchedData));
            return;
          case 'line':
            this.props
              .fetchDashboardData(active, latestDate) // fetch data before updating line chart
              .then(fetchedData => {
                this.updateLineChart(fetchedData);
              });
            return;

          case 'bubble':
            this.props
              .fetchBubbleData(active, latestDate) // fetch data before updating bubble chart
              .then(fetchedData => this.updateBubbleChart(fetchedData));
            return;
          default:
            return;
        }
      }
    );
  };

  componentDidMount() {
    // fetch needed data and update corresponding chart when component is mounted
    this.fetchAndUpdateCharts();
  }

  handleButtonClick = (type, value) => {
    this.props.changeActive(type, value, () => {
      switch (type) {
        case 'community':
        case 'range':
        case 'barPeriod':
        case 'chart':
        case 'bubblePeriod':
        case 'mentionPortion':
        case 'indicator':
          this.fetchAndUpdateCharts();
          return;
        default:
          this.updateLineChart();
          this.updateBarChart();
          return;
      }
    });
  };

  handleCheck = (type, value) => {
    const newValue = {
      ...value,
      checked: !value.checked
    };
    this.props.toggleIndicator(newValue);
  };

  render() {
    return (
      <React.Fragment>
        <div className='mainboard-wrapper'>
          <div className='mainboard-menu-container'>
            <MainBoardMenu
              handleClick={this.handleButtonClick}
              handleCheck={this.handleCheck}
            />
          </div>
          <div
            className='mainboard-content-container'
            id='mainboard-content-container'
          >
            <MainBoardContent
              handleClick={this.handleButtonClick}
              lineChartData={this.state.lineChartData}
              barChartData={this.state.barChartData}
              bubbleChartData={this.state.bubbleChartData}
              chartIsLoading={this.state.chartIsLoading}
            />
          </div>
        </div>
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
  {
    changeActive,
    fetchDashboardData,
    fetchPeriodData,
    fetchBubbleData,
    fetchTodayIndicators,
    toggleIndicator
  }
)(MainBoard);
