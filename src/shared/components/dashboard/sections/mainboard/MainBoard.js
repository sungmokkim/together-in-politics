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
    bubbleChartData: []
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
        acc.indexOf(val.today.substr(0, split)) > -1
          ? null
          : acc.push(val.today.substr(0, split));
        return acc;
      }, [])
      .reduce((acc, val) => {
        acc[val] = [];
        return acc;
      }, {});

    const dataArray = dataToMap.forEach(dt => {
      dateObj[dt.today.substr(0, split)].push(dt[active.indicator]);
    });

    const datesInArray = Object.keys(dateObj);
    const dataInArray = datesInArray.map(date => {
      return (
        dateObj[date].reduce((acc, val) => acc + val) / dateObj[date].length
      ).toFixed(2);
    });

    this.setState({
      ...this.state,
      chartIsLoading: false,
      lineChartData: {
        labels: datesInArray,
        dataArray: dataInArray
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
            y: (data.popularity * 100).toFixed(1),
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
    const { active, latestDate, communities } = this.props.dashboardManager;

    this.setState(
      {
        ...this.state,
        chartIsLoading: true
      },
      () => {
        switch (active.chart.index) {
          case 'bar':
            this.props
              .fetchPeriodData(active)
              .then(fetchedData => this.updateBarChart(fetchedData));
            return;
          case 'line':
            this.props
              .fetchDashboardData(active, communities[active.community].weight)
              .then(fetchedData => this.updateLineChart(fetchedData));
            return;

          case 'bubble':
            this.props
              .fetchBubbleData(active, latestDate)
              .then(fetchedData => this.updateBubbleChart(fetchedData));
            return;
          default:
            return;
        }
      }
    );
  };

  componentDidMount() {
    this.fetchAndUpdateCharts();
  }

  handleButtonClick = (type, value) => {
    this.props.changeActive(type, value, () => {
      const { communities, active, currentDate } = this.props.dashboardManager;
      switch (type) {
        case 'community':
          this.fetchAndUpdateCharts();
          this.props.fetchTodayIndicators(
            currentDate.year,
            currentDate.month,
            currentDate.date,
            false,
            active.community,
            communities[active.community].weight
          );
          return;
        case 'range':
        case 'period':
        case 'chart':
        case 'bubblePeriod':
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
        {/* <SectionTitle title='DASHBOARD' /> */}
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
