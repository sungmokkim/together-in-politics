import React, { Component } from 'react';
import SectionTitle from '../../../common/SectionTitle';
import { connect } from 'react-redux';
import MainBoardMenu from './MainBoardMenu';
import MainBoardContent from './MainBoardContent';
import {
  changeActive,
  fetchDashboardData,
  fetchPeriodData
} from '../../../../actions/actions';
import { initializeChart, drawChart } from './ChartDrawing';

class MainBoard extends Component {
  state = {
    chart: null,
    lineChartData: {
      labels: [],
      datasets: [
        {
          data: [],
          fill: false,
          backgroundColor: '#5580A0',
          borderColor: '#5580A0',
          pointHoverBorderWidth: 10,
          lineTension: 0.1
        }
      ]
    },
    barChartData: {
      labels: [],
      datasets: [
        {
          data: [],
          fill: false,
          backgroundColor: '#5580A0',
          borderColor: '#5580A0'
        }
      ]
    }
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
      lineChartData: {
        ...this.state.lineChartData,
        labels: datesInArray,
        datasets: [
          {
            ...this.state.lineChartData.datasets,

            data: dataInArray
          }
        ]
      }
    });
  };

  updateBarChart = (inputData = null) => {
    const { period } = this.props.dashboardManager;

    let dataToMap;

    if (inputData) {
      dataToMap = inputData;
    } else {
      dataToMap = this.props.data.periodData;
    }

    const splitCount =
      Math.floor(dataToMap.length / 12) === 0
        ? Math.floor(dataToMap.length / 12)
        : Math.floor(dataToMap.length / 12) + 1;

    const obj = {};

    for (let i = 0; i < splitCount; i++) {
      let arrSliced = dataToMap.slice(i * 12, (i + 1) * 12);

      obj[i] =
        arrSliced
          .map(dt => dt.anti_count)
          .reduce((acc, val) => {
            return acc + val;
          }) / arrSliced.length;
    }

    const datesInArray = Object.keys(obj).map(key => {
      return period[key].display;
    });

    const dataInArray = Object.keys(obj).map(key => {
      return obj[key].toFixed(2);
    });

    this.setState({
      ...this.state,
      barChartData: {
        ...this.state.barChartData,
        labels: datesInArray,
        datasets: [
          {
            ...this.state.barChartData.datasets,

            data: dataInArray
          }
        ]
      }
    });
  };

  componentDidMount() {
    const { active } = this.props.dashboardManager;

    if (!this.props.data.dashboardData.length) {
      this.props
        .fetchDashboardData(this.props.dashboardManager.active)
        .then(fetchedData => this.updateLineChart(fetchedData));
      this.props
        .fetchPeriodData(active.community)
        .then(fetchedData => this.updateBarChart(fetchedData));
    } else {
      this.props
        .fetchPeriodData(active.community)
        .then(fetchedData => this.updateBarChart(fetchedData));
      this.updateLineChart();
    }
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props.dashboardManager;
    if (active !== prevProps.dashboardManager.active) {
      this.updateLineChart();
    }
  }

  handleButtonClick = (type, value) => {
    this.props.changeActive(type, value, () => {
      if (type === 'community' || type === 'range') {
        this.props
          .fetchDashboardData(this.props.dashboardManager.active)
          .then(fetchedData => this.updateLineChart(fetchedData));
        this.props
          .fetchPeriodData(this.props.dashboardManager.active.community)
          .then(fetchedData => this.updateBarChart(fetchedData));
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <SectionTitle title='DASHBOARD' />
        <div className='mainboard-wrapper'>
          <div className='mainboard-menu-container'>
            <MainBoardMenu handleClick={this.handleButtonClick} />
          </div>
          <div className='mainboard-content-container'>
            <MainBoardContent
              handleClick={this.handleButtonClick}
              lineChartData={this.state.lineChartData}
              barChartData={this.state.barChartData}
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
  { changeActive, fetchDashboardData, fetchPeriodData }
)(MainBoard);
