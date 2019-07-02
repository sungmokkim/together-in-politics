import React, { Component } from 'react';
import mapLinkToWords from '../../../functions/mapLinkToWords';
import SlideNotification from '../../common/SlideNotification';
import ContentLoading from '../../common/ContentLoading';
import IndicatorBar from '../../common/IndicatorBar';

class KeywordsTable extends Component {
  mapTbody = () => {
    const { anti_ratio } = this.props.indicators;

    return this.props.data.map((dt, index) => {
      return (
        <tr key={dt._id}>
          <td className='center'>{`${index + 1}위`}</td>
          <td className='center'>
            {`${(dt[this.props.sorting.index] * 100).toFixed(1)}%`}
            <br />
            <IndicatorBar
              totalWidth='50%'
              totalHeight='1rem'
              value={(dt[this.props.sorting.index] * 100).toFixed(1)}
              statusValues={
                this.props.indicators[this.props.sorting.index].statusValues
              }
              statusMarks={
                this.props.indicators[this.props.sorting.index].statusMarks
              }
            />
          </td>
          <td className='center'>{dt.dates.substr(2, 9)}</td>
          {[...Array(5).keys()].map(index => {
            return (
              <td
                className={`center ${dt.words[index] ? null : 'no-word'}`}
                key={index}
              >
                {dt.words[index]
                  ? mapLinkToWords(dt.words[index]['word'], dt.name)
                  : '조건 불충족'}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  renderLoading = () => {
    return this.props.contentIsLoading ? (
      <ContentLoading alignItems='start' marginTop='15rem' />
    ) : null;
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
        <div className='keywords-table-container'>
          {this.renderSlideIcon()}
          {this.renderLoading()}
          <table className='keywords-table'>
            <thead>
              <tr>
                <th className='center'>순위</th>
                <th className='center meter-header'>
                  {this.props.sorting.koreanShort}
                </th>
                <th className='center'>날짜</th>
                <th className='center keywords-fixed-header'>
                  키워드 <br />
                  1위
                </th>
                <th className='center keywords-fixed-header'>
                  키워드 <br />
                  2위
                </th>
                <th className='center keywords-fixed-header'>
                  키워드 <br />
                  3위
                </th>
                <th className='center keywords-fixed-header'>
                  키워드 <br />
                  4위
                </th>
                <th className='center keywords-fixed-header'>
                  키워드 <br />
                  5위
                </th>
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

export default KeywordsTable;
