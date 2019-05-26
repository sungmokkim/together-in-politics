import React, { Component } from 'react';
import SectionTitle from '../../../common/SectionTitle';
import { connect } from 'react-redux';
import MainBoardMenu from './MainBoardMenu';
import MainBoardContent from './MainBoardContent';
import { changeActive, fetchDashboardData } from '../../../../actions/actions';
import { initializeChart, drawChart } from './ChartDrawing';

class MainBoard extends Component {
  constructor() {
    super();

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      chart: null
    };
  }

  componentDidMount() {
    const chart = initializeChart();
    this.setState({ chart: chart });
  }

  componentDidUpdate(prevProps) {
    const { active, communities } = this.props.dashboardManager;

    const dataInArray = this.props.data.map(dt => {
      return dt[active.indicator];
    });

    const datesInArray = this.props.data.map(dt => {
      return dt.today;
    });

    drawChart(
      this.state.chart,
      datesInArray,
      dataInArray,
      communities[active.community]
    );
  }

  handleButtonClick(type, value) {
    this.props.changeActive(type, value, () => {
      if (type === 'community' || type === 'range') {
        console.log(type);

        this.props.fetchDashboardData(this.props.dashboardManager.active);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <SectionTitle title='DASHBOARD' />
        <div className='mainboard-wrapper'>
          <div className='mainboard-menu-container'>
            <MainBoardMenu handleClick={this.handleButtonClick} />
          </div>
          <div className='mainboard-content-container'>
            <MainBoardContent handleClick={this.handleButtonClick} />
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
  { changeActive, fetchDashboardData }
)(MainBoard);
