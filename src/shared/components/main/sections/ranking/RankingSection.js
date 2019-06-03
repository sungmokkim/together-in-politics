import React, { Component } from 'react';
import SectionTitle from '../../../common/SectionTitle';
import Ranking from './Ranking';
import { connect } from 'react-redux';
import Loading from '../../../common/Loading';

class RankingSection extends Component {
  render() {
    const { rankings } = this.props.today;
    const { communities } = this.props.dashboardManager;

    const rankData = rankings.map(rank => {
      const reverseRank = rankings.length + 1;
      return {
        rank: reverseRank - rank['rank_today'],
        community: communities[rank['name']].korean,
        score: ((1 - rank['anti_ratio']) * 100).toFixed(2),
        rankChange: rank['rank_yesterday']
          ? reverseRank -
            rank['rank_yesterday'] -
            (reverseRank - rank['rank_today'])
          : 'none'
      };
    });

    const renderContent = () => {
      return rankings.length ? <Ranking data={rankData} /> : <Loading />;
    };

    return (
      <section className='section-global'>
        {/* <SectionTitle title='RANKING' /> */}
        <div className='ranking-container'>{renderContent()}</div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
};
export default connect(mapStateToProps)(RankingSection);
