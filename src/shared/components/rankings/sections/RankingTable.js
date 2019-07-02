import React, { Component } from 'react';
import SlideNotification from '../../common/SlideNotification';
import ContentLoading from '../../common/ContentLoading';
import IndicatorBar from '../../common/IndicatorBar';

class RankingTable extends Component {
  mapTbody = () => {
    return this.props.data.map((dt, index) => {
      return (
        <tr key={dt._id}>
          <td
            className={`center ${
              index + 1 === 1
                ? 'first rank left'
                : index + 1 === this.props.data.length
                ? 'last rank left'
                : 'rank left'
            }`}
          >{`${index + 1}위`}</td>
          <td className='center'>{dt.name}</td>

          {this.props.fieldOrder.map((field, index) => {
            return (
              <td
                className={`center ${index === 0 ? 'td-highlight' : null}`}
                key={field}
              >
                {`${dt[field]}%`}
                <br />
                <IndicatorBar
                  totalWidth='50%'
                  totalHeight='1.5rem'
                  value={dt[field]}
                  statusValues={this.props.indicators[field].statusValues}
                  statusMarks={this.props.indicators[field].statusMarks}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  mapThead = () => {
    return this.props.fieldOrder.map(field => {
      return (
        <th className='center ranking-fixed-header' key={field}>
          {this.props.fieldNames[field]['korean']}
        </th>
      );
    });
  };

  renderLoading = () => {
    return this.props.contentIsLoading ? <ContentLoading /> : null;
  };

  renderSlideIcon = () => {
    // render slide icon only after data loading is completed
    // also, only display icon when coming dataset has more than one row
    return this.props.contentIsLoading ? null : this.props.data.length ? (
      <SlideNotification />
    ) : null;
  };
  render() {
    return (
      <section className='section-global'>
        <div className='ranking-table-container'>
          {this.renderSlideIcon()}
          {this.renderLoading()}
          <table className='ranking-table'>
            <thead>
              <tr>
                <th className='center'>순위</th>
                <th className='center'>커뮤니티</th>
                {this.mapThead()}
              </tr>
            </thead>

            <tbody
              style={{
                animation: this.props.contentIsLoading
                  ? null
                  : 'opacity-fade-in 1s forwards'
              }}
            >
              {this.mapTbody()}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default RankingTable;
