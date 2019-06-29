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
    const { communities, active } = this.props.dashboardManager;

    // ranking sorting option (coming from redux state)
    const indicatorToSortBy = active.rankingSorting.index;

    // map weights to the indicators for each community
    const dataMapped = data.map(dt => {
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
        name: communities[dt.name]['korean'] // map full names
      };
    });

    // sort by given sorting option
    const dataSorted = dataMapped.sort((a, b) => {
      return b[indicatorToSortBy] - a[indicatorToSortBy];
    });

    // change table field order based on the current sorting option
    const getFieldOrder = () => {
      switch (indicatorToSortBy) {
        case 'popularity':
          return ['popularity', 'anti_ratio', 'femi_ratio'];
        case 'femi_ratio':
          return ['femi_ratio', 'anti_ratio', 'popularity'];
        case 'anti_ratio':
          return ['anti_ratio', 'femi_ratio', 'popularity'];

        default:
          ['anti_ratio', 'femi_ratio', 'popularity'];
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
    document.body.style.overflow = 'scroll';

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
          fieldNames={this.props.dashboardManager.todayIndicators}
          contentIsLoading={this.state.contentIsLoading}
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
