import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainBoardMenu from './MainBoardMenu';
import MainBoardContent from './MainBoardContent';
import {
  changeActive,
  fetchDashboardData,
  fetchPeriodData,
  fetchBubbleData,
  fetchTodayIndicators
} from '../../../../actions/actions';

class MainBoard extends Component {
  state = {
    chart: null,
    chartIsLoading: false,

    lineChartData: {
      labels: [],
      dataArray: []
    },
    barChartData: {
      labels: [],
      dataArray: []
    },
    bubbleChartData: [],
    firstTimeLoaded: true
  };

  updateLineChart = (inputData = null) => {
    const { active } = this.props.dashboardManager;

    let dataToMap;

    if (inputData) {
      dataToMap = inputData;
    } else {
      dataToMap = this.props.data.dashboardData;
    }

    const split = active.range.split;
    const dateObj = dataToMap
      .reduce((acc, val) => {
        // reduce and group date string based on current duration
        acc.indexOf(val.today.substr(0, split)) > -1 // if sliced date is in accumulated array
          ? null // don't include
          : acc.push(val.today.substr(0, split)); // if not, include it
        return acc;
      }, [])
      .reduce((acc, val) => {
        // reduce it one more time
        acc[val] = []; // make each array for one date and store it in the object
        return acc;
      }, {});

    const dataArray = dataToMap.forEach(dt => {
      dateObj[dt.today.substr(0, split)].push(dt[active.indicator]); // push data to object with same date
    });

    const datesInArray = Object.keys(dateObj); // this is actual x axis in line graph
    const dataInArray = datesInArray.map(date => {
      // this is actual y axis in line graph
      return (
        dateObj[date].reduce((acc, val) => acc + val) / dateObj[date].length
      ) // divide reduced(summed) data into array length ( to make it avg )
        .toFixed(2); // only 2 decimal places
    });

    this.setState({
      ...this.state,
      chartIsLoading: false, // turn off chart loading component (it was turned on in higher order function)
      lineChartData: {
        labels: datesInArray,
        dataArray: dataInArray // set data in state
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

  render() {
    return (
      <React.Fragment>
        <div className='mainboard-wrapper'>
          <div className='mainboard-menu-container'>
            <MainBoardMenu handleClick={this.handleButtonClick} />
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
    fetchTodayIndicators
  }
)(MainBoard);
