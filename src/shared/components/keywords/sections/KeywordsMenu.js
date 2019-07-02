import React, { Component } from 'react';

import { connect } from 'react-redux';
import IndicatorBtn from '../../common/IndicatorBtn';

class KeywordsMenu extends Component {
  getMenus = () => {
    return (
      <React.Fragment>
        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='community'
          valueIsObject={true}
        />
        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='keywordPeriod'
          valueIsObject={true}
        />

        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='rankingSorting'
          valueIsObject={true}
        />
        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='mentionPortion'
          valueIsObject={true}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='section-global'> {this.getMenus()}</div>
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
export default connect(mapStateToProps)(KeywordsMenu);
