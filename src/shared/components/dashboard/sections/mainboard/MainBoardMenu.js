import React, { Component } from 'react';
import CommunitySelectButton from '../../../common/CommunitySelectButton';
import { connect } from 'react-redux';

class MainBoardMenu extends Component {
  render() {
    const { active, communities } = this.props.dashboardManager;

    const communitiesMapped = Object.keys(communities).map(comm => {
      return (
        <li key={comm}>
          <CommunitySelectButton
            title={communities[comm]}
            activate={comm}
            isActive={active.community === comm ? true : false}
            handleClick={this.props.handleClick}
            type='community'
          />
        </li>
      );
    });
    return <ul>{communitiesMapped}</ul>;
  }
}
function mapStateToProps(state) {
  return {
    dashboardManager: state.dashboardManager,
    data: state.dashboardData
  };
}
export default connect(mapStateToProps)(MainBoardMenu);
