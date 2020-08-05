import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayRankings,
  changeCurrentDate,
  changeActive,
  toggleStatus
} from '../../../actions/actions';
import CurrentStatus from '../../common/CurrentStatus';
import RankingTable from './RankingTable';
import RankingMenu from './RankingMenu';
import dateAndTime from 'date-and-time';

class RankingMain extends Component {
  state = {
    rankingTableData: [],
    fieldOrder: [],
    contentIsLoading: false
  };
  // below 2 functions are needed to display modal(dark overlay) when one of the two conditions is met
  // 1. a user clicks a  button
  // 2. a user clicks a status card
  // to do both, these functions need to be where these 2 conditions can be controlled
  toggleBtn = toggleType => {
    if (this.props.site[toggleType].clicked) {
      // if it's already clicked, execute closing function
      this.controlModalFadeOut(toggleType);
    } else {
      // if it is not clicked, activate all these three
      this.props.toggleStatus({ toggleType, toggleComponent: 'clicked' });
      this.props.toggleStatus({ toggleType, toggleComponent: 'modalDisplay' });
      this.props.toggleStatus({
        toggleType,
        toggleComponent: 'componentDisplay'
      });
    }
  };

  controlModalFadeOut = async toggleType => {
    // this is closing function

    // change 'clicked' status first (to perform 'fade-out' animation first)
    this.props.toggleStatus({ toggleType, toggleComponent: 'clicked' });

    // give delay of 0.3s to perform fade-out animation
    const delayModal = await setTimeout(() => {
      // deactivate these two after the time out
      this.props.toggleStatus({ toggleType, toggleComponent: 'modalDisplay' });
      this.props.toggleStatus({
        toggleType,
        toggleComponent: 'componentDisplay'
      });
    }, 300);
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
          name: communities[dt.name]['korean'], // map full names,,
          commIndex: dt.name
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
    const {
      active,
      rankingSortingOptions,
      todayIndicators,
      communities,
      currentDate
    } = this.props.dashboardManager;

    const currentDateParsed = dateAndTime
      .parse(
        `${currentDate.year}-${currentDate.month}-${currentDate.date}`,
        'YYYY-MM-DD',
        true
      )
      .toLocaleString('ko-KR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
    return (
      <section>
        <CurrentStatus
          list={[
            {
              icon: 'far fa-calendar-alt',
              status: currentDateParsed
            },
            {
              icon: 'fas fa-tachometer-alt',
              status: active.indicatorOption['korean']
            },
            {
              icon: 'fas fa-filter',
              status: active.mentionPortion['korean']
            }
          ]}
          handleClick={this.toggleBtn}
          toggleType='status'
        />
        <RankingMenu
          handleDateChangeFromCalendar={this.handleDateChangeFromCalendar}
          handleSortingChange={this.handleSortingChange}
          clicked={this.props.site.status.clicked}
          modalDisplay={this.props.site.status.modalDisplay}
          componentDisplay={this.props.site.status.componentDisplay}
          controlModalFadeOut={this.controlModalFadeOut}
          toggleBtn={this.toggleBtn}
          toggleType='status'
        />
        <RankingTable
          data={this.state.rankingTableData}
          fieldOrder={this.state.fieldOrder}
          fieldNames={rankingSortingOptions}
          contentIsLoading={this.state.contentIsLoading}
          indicators={todayIndicators}
          indicatorOption={active.indicatorOption}
          active={active}
          communities={communities}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.siteManager,
    data: state.today,
    dashboardManager: state.dashboardManager
  };
};
export default connect(
  mapStateToProps,
  { fetchTodayRankings, changeCurrentDate, changeActive, toggleStatus }
)(RankingMain);
