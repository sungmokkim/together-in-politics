import React, { Component } from 'react';
import withModal from '../../hoc/withModal';
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
          btnClicked={this.props.btnClicked}
        />
        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='keywordPeriod'
          valueIsObject={true}
          btnClicked={this.props.btnClicked}
        />

        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='rankingSorting'
          valueIsObject={true}
          btnClicked={this.props.btnClicked}
        />
        <IndicatorBtn
          handleClick={this.props.handleChange}
          type='mentionPortion'
          valueIsObject={true}
          btnClicked={this.props.btnClicked}
        />
      </React.Fragment>
    );
  };

  render() {
    return <React.Fragment>{this.getMenus()}</React.Fragment>;
  }
}
function mapStateToProps(state) {
  return {
    dashboardManager: state.dashboardManager,
    data: state.dashboardData
  };
}
export default withModal({
  configBtn: true,
  fixedPositionClassName: 'setting-container'
})(connect(mapStateToProps)(KeywordsMenu));
