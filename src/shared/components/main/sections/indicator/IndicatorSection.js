import React, { Component } from 'react';
import Indicator from './Indicator';
import SectionTitle from '../../../common/SectionTitle';
import { connect } from 'react-redux';

class IndicatorSection extends Component {
  render() {
    const { today } = this.props;
    const getValue = key => {
      return today.indicators.length ? today.indicators[0][key] : null;
    };

    return (
      <section className='section-global'>
        <SectionTitle title='KEY INDICATORS' />
        <div className='indicator-container'>
          <Indicator
            title='오늘의 관심'
            value={getValue('popularity')}
            isNumber={true}
            statusValue={[0.01, 0.005, 0.0001, 0.00005]}
            statusName={[
              '관심 매우 많음',
              '관심 많음',
              '보통',
              '관심 없음',
              '관심 매우 없음'
            ]}
            metric='%'
          />

          <Indicator
            title='오늘의 민심'
            value={getValue('like_ratio')}
            isNumber={true}
            statusValue={[0.75, 0.5, 0.25, 0.1]}
            statusName={[
              '아주 좋아함',
              '좋아함',
              '보통',
              '혐오함',
              '극도로 혐오함'
            ]}
            metric='%'
          />

          <Indicator
            title='오늘의 단어'
            value={getValue('word1')}
            isNumber={false}
            word_value={getValue('word1_1')}
            min={0}
            max={1}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
}

export default connect(mapStateToProps)(IndicatorSection);
