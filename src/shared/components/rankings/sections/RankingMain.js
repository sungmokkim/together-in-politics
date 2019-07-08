import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayRankings,
  changeCurrentDate,
  changeActive
} from '../../../actions/actions';
import RankingTable from './RankingTable';
import RankingMenu from './RankingMenu';

class RankingMain extends Component {
  state = {
    rankingTableData: [],
    fieldOrder: [],
    contentIsLoading: false
  };

  fetchAndUpdate = () => {
    // this function is to
    // 1. change state 'contentIsLoading' to true
    // 2. in browser, loading component will display
    // 3. start fetching data through action
    // 4. do necessary mapping or editing(if needed)
    // 5. change state 'contentIsLoading' back to false
    // 6. loading component disappears
    // 7. fetched content will display

    const { currentDate } = this.props.dashboardManager;
    this.setState(
      {
        ...this.state,
        contentIsLoading: true
      },
      () => {
        this.props
          .fetchTodayRankings(
            currentDate.year,
            currentDate.month,
            currentDate.date
          )
          .then(data => {
            this.mapAndSortRankings(data);
            this.setState({
              ...this.state,
              contentIsLoading: false
            });
          });
      }
    );
  };

  componentDidMount() {
    // when component mounts, fetch rankings based on current date, and map and sort it

    this.fetchAndUpdate();
  }

  mapAndSortRankings = data => {
    const { communities, active, maxValues } = this.props.dashboardManager;

    // ranking sorting option (coming from redux state)
    const indicatorToSortBy = active.rankingSorting.index;

    let dataMapped;

    if (active.indicatorOption.index === 'relative') {
      dataMapped = data.map(dt => {
        return {
          ...dt,
          // divide each indicator by respective max value and multiply it by 100
          popularity: parseFloat(
            ((dt.popularity / maxValues[dt.name].popularity) * 100).toFixed(2)
          ),
          femi_ratio: parseFloat(
            ((dt.femi_ratio / maxValues[dt.name].femi_ratio) * 100).toFixed(2)
          ),
          anti_ratio: parseFloat(
            ((dt.anti_ratio / maxValues[dt.name].anti_ratio) * 100).toFixed(2)
          ),
          problem_ratio: parseFloat(
            (
              (dt.problem_ratio / maxValues[dt.name].problem_ratio) *
              100
            ).toFixed(2)
          ),
          name: communities[dt.name]['korean'] // map full names
        };
      });
    } else {
      // map weights to the indicators for each community
      dataMapped = data.map(dt => {
        return {
          ...dt,
          // divide each indicator by respective weights and multiply by 100
          popularity: parseFloat(
            (
              (dt.popularity / communities[dt.name].popularityWeight) *
              100
            ).toFixed(2)
          ),
          femi_ratio: parseFloat(
            ((dt.femi_ratio / communities[dt.name].femiWeight) * 100).toFixed(2)
          ),
          anti_ratio: parseFloat((dt.anti_ratio * 100).toFixed(2)),
          problem_ratio: parseFloat(
            (
              (dt.problem_ratio / communities[dt.name].problemWeight) *
              100
            ).toFixed(2)
          ),
          name: communities[dt.name]['korean'] // map full names
        };
      });
    }

    // sort by given sorting option
    const dataSorted = dataMapped.sort((a, b) => {
      return b[indicatorToSortBy] - a[indicatorToSortBy];
    });

    // change table field order based on the current sorting option
    const getFieldOrder = () => {
      switch (indicatorToSortBy) {
        case 'popularity':
          return ['popularity', 'anti_ratio', 'femi_ratio', 'problem_ratio'];
        case 'femi_ratio':
          return ['femi_ratio', 'problem_ratio', 'popularity', 'anti_ratio'];
        case 'anti_ratio':
          return ['anti_ratio', 'femi_ratio', 'problem_ratio', 'popularity'];
        case 'problem_ratio':
          return ['problem_ratio', 'popularity', 'anti_ratio', 'femi_ratio'];

        default:
          ['anti_ratio', 'femi_ratio', 'problem_ratio', 'popularity'];
      }
    };

    const fieldOrderArray = getFieldOrder();
    // set data as state
    this.setState({
      ...this.state,
      rankingTableData: dataSorted,
      fieldOrder: fieldOrderArray
    });
  };

  handleSortingChange = (type, value) => {
    this.props.changeActive(type, value).then(() => {
      this.mapAndSortRankings(this.props.data.rankings);
    });
  };

  handleDateChangeFromCalendar = ({ year, month, date }) => {
    // when date is changed, modal closes,
    // so browser scroll must be restored
    document.body.style.overflow = 'auto';

    // change current date based on given data, and fetch data again, and map it again
    this.props
      .changeCurrentDate(year, month, date)
      .then(({ year, month, date }) => {
        this.fetchAndUpdate();
      });
  };

  render() {
    return (
      <section>
        <RankingMenu
          handleDateChangeFromCalendar={this.handleDateChangeFromCalendar}
          handleSortingChange={this.handleSortingChange}
        />
        <RankingTable
          data={this.state.rankingTableData}
          fieldOrder={this.state.fieldOrder}
          fieldNames={this.props.dashboardManager.rankingSortingOptions}
          contentIsLoading={this.state.contentIsLoading}
          indicators={this.props.dashboardManager.todayIndicators}
          indicatorOption={this.props.dashboardManager.active.indicatorOption}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.today,
    dashboardManager: state.dashboardManager
  };
};
export default connect(
  mapStateToProps,
  { fetchTodayRankings, changeCurrentDate, changeActive }
)(RankingMain);
