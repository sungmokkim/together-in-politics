import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const tbody = this.props.data.map(rank => {
      const getRankChange = () => {
        if (rank.rankChange > 0) {
          return (
            <React.Fragment>
              <i className='fas fa-caret-up rank-up' /> {rank.rankChange}
            </React.Fragment>
          );
        } else if (rank.rankChange < 0) {
          return (
            <React.Fragment>
              <i className='fas fa-caret-down rank-down' />
              {Math.abs(rank.rankChange)}
            </React.Fragment>
          );
        } else if (rank.rankChange === 0) {
          return (
            <React.Fragment>
              <i className='fas fa-minus rank-same' />
            </React.Fragment>
          );
        } else if (rank.rankChange === 'none') {
          return (
            <React.Fragment>
              <span>전날 순위 없음</span>
            </React.Fragment>
          );
        }
      };
      return (
        <tr key={rank.rank}>
          <td className={rank.rank === 1 ? 'first rank left' : 'rank left'}>
            {`${rank.rank} 위 `}
          </td>
          <td className='community center'>{rank.community}</td>
          <td className='score center'>{`${rank.score}%`}</td>
          <td className='rank-change right'>{getRankChange()}</td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        {/* <div>
          <SmallTitle title='클린 커뮤니티 순위' />
        </div> */}
        <table className='ranking-table'>
          <thead>
            <tr>
              <th className='left'>순위</th>
              <th>커뮤니티</th>
              <th>오늘의 민심</th>
              <th className='right'>전날 대비</th>
            </tr>
          </thead>

          <tbody>{tbody}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Ranking;
