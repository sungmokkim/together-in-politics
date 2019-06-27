import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKeywords, changeActive } from '../../../actions/actions';
import KeywordsTable from './KeywordsTable';
import KeywordsMenu from './KeywordsMenu';

class KeywordsMain extends Component {
  componentDidMount() {
    const { active, latestDate } = this.props.dashboardManager;

    //  fetch keywords when component is mounted
    this.props.fetchKeywords(active, latestDate);
  }

  handleChange = (type, value) => {
    this.props.changeActive(type, value, () => {
      const { active, latestDate } = this.props.dashboardManager;
      this.props.fetchKeywords(active, latestDate);
    });
  };

  render() {
    return (
      <section>
        <KeywordsMenu handleChange={this.handleChange} />

        <KeywordsTable data={this.props.data.keywords} />
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
