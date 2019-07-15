import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchKeywords,
  changeActive,
  toggleStatus
} from '../../../actions/actions';
import KeywordsTable from './KeywordsTable';
import KeywordsMenu from './KeywordsMenu';
import CurrentStatus from '../../common/CurrentStatus';

class KeywordsMain extends Component {
  state = {
    contentIsLoading: true
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

    const { active, latestDate } = this.props.dashboardManager;
    this.setState(
      {
        ...this.state,
        contentIsLoading: true
      },
      () => {
        this.props.fetchKeywords(active, latestDate).then(() => {
          this.setState({
            ...this.state,
            contentIsLoading: false
          });
        });
      }
    );
  };

  componentDidMount() {
    // reset scroll to the top
    // (when it is redirected from the main page, the scroll position was at the middle of the viewport)
    window.scrollTo(0, 0);
    //  fetch and update keywords when component is mounted
    this.fetchAndUpdate();
  }

  handleChange = (type, value) => {
    this.props.changeActive(type, value, () => {
      this.fetchAndUpdate();
    });
  };

  render() {
    const { active } = this.props.dashboardManager;
    return (
      <section>
        <CurrentStatus
          list={[
            {
              icon: 'fas fa-tasks',
              status: active.community['korean']
            },
            {
              icon: 'fas fa-sort-numeric-down',
              status: active.rankingSorting['korean']
            },
            {
              icon: 'far fa-clock',
              status: active.keywordPeriod['koreanShort']
            }
          ]}
          handleClick={this.toggleBtn}
          toggleType='status'
        />
        <KeywordsMenu
          handleChange={this.handleChange}
          clicked={this.props.site.status.clicked}
          modalDisplay={this.props.site.status.modalDisplay}
          componentDisplay={this.props.site.status.componentDisplay}
          controlModalFadeOut={this.controlModalFadeOut}
          toggleBtn={this.toggleBtn}
          toggleType='status'
        />

        <KeywordsTable
          data={this.props.data.keywords}
          contentIsLoading={this.state.contentIsLoading}
          indicators={this.props.dashboardManager.todayIndicators}
          sorting={this.props.dashboardManager.active.rankingSorting}
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.siteManager,
    data: state.dashboardData,
    dashboardManager: state.dashboardManager
  };
};

export default connect(
  mapStateToProps,
  { fetchKeywords, changeActive, toggleStatus }
)(KeywordsMain);
