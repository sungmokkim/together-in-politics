import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKeywords, changeActive } from '../../../actions/actions';
import KeywordsTable from './KeywordsTable';
import KeywordsMenu from './KeywordsMenu';

class KeywordsMain extends Component {
  state = {
    contentIsLoading: true
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
    //  fetch and update keywords when component is mounted
    this.fetchAndUpdate();
  }

  handleChange = (type, value) => {
    this.props.changeActive(type, value, () => {
      this.fetchAndUpdate();
    });
  };

  render() {
    return (
      <section>
        <KeywordsMenu handleChange={this.handleChange} />

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
    data: state.dashboardData,
    dashboardManager: state.dashboardManager
  };
};

export default connect(
  mapStateToProps,
  { fetchKeywords, changeActive }
)(KeywordsMain);
