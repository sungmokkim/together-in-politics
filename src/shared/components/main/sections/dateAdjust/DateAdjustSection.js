import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeCurrentDate,
  fetchTodayIndicators,
  fetchTodayRankings
} from '../../../../actions/actions';
import { getAndMap } from './DateModule';

class DateAdjust extends Component {
  state = {
    year: this.props.dashboardManager.currentDate.year,
    month: this.props.dashboardManager.currentDate.month,
    date: this.props.dashboardManager.currentDate.date,
    name: null,
    value: null
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      year: this.props.dashboardManager.currentDate.year,
      month: this.props.dashboardManager.currentDate.month,
      date: this.props.dashboardManager.currentDate.date
    });
  }

  handleChange = event => {
    const {
      changeCurrentDate,
      fetchTodayIndicators,
      fetchTodayRankings
    } = this.props;

    const { latestDate } = this.props.dashboardManager;

    const latestDateNewName = {
      latestYear: latestDate.year,
      latestMonth: latestDate.month,
      latestDate: latestDate.date
    };

    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value
      },
      () => {
        const currentStateNew = {
          currentYear: this.state.year,
          currentMonth: this.state.month,
          currentDate: this.state.date
        };

        getAndMap(latestDateNewName, currentStateNew, 'valid').then(
          ({ year, month, date }) => {
            changeCurrentDate(year, month, date);
            this.setState({ year, month, date }, () => {
              fetchTodayRankings(
                this.state.year,
                this.state.month,
                this.state.date
              );
              fetchTodayIndicators(
                this.state.year,
                this.state.month,
                this.state.date
              );
            });
          }
        );
      }
    );
  };

  render() {
    const { latestDate, currentDate } = this.props.dashboardManager;

    const latestDateNewName = {
      latestYear: latestDate.year,
      latestMonth: latestDate.month,
      latestDate: latestDate.date
    };

    const currentDateNewName = {
      currentYear: currentDate.year,
      currentMonth: currentDate.month,
      currentDate: currentDate.date
    };
    return (
      <section className='section-global'>
        <div className='date-adj-container'>
          <div>
            <select
              name='year'
              id='year'
              onChange={this.handleChange}
              value={currentDate.year}
            >
              {getAndMap(latestDateNewName, currentDateNewName, 'year')}
            </select>
            <span>년</span>
            <select
              name='month'
              id='month'
              onChange={this.handleChange}
              value={currentDate.month}
            >
              {getAndMap(latestDateNewName, currentDateNewName, 'month')}
            </select>
            <span>월</span>
            <select
              name='date'
              id='date'
              onChange={this.handleChange}
              value={currentDate.date}
            >
              {getAndMap(latestDateNewName, currentDateNewName, 'date')}
            </select>
            <span>일</span>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardManager: state.dashboardManager
  };
};

export default connect(
  mapStateToProps,
  { changeCurrentDate, fetchTodayIndicators, fetchTodayRankings }
)(DateAdjust);
