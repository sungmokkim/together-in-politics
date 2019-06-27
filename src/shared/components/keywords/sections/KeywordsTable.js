import React, { Component } from 'react';
import mapLinkToWords from '../../../functions/mapLinkToWords';
class KeywordsTable extends Component {
  mapTbody = () => {
    // // declare object to get average anti_ratio of given data(can't directly divide acculmated anti_ratio by data length)
    // const avgObj = {
    //   anti_count: 0,
    //   m_count: 0
    // };

    // // add values to respective field
    // this.props.data.forEach(dt => {
    //   avgObj.anti_count += dt.anti_count;
    //   avgObj.m_count += dt.m_count;
    // });

    // // get anti ratio average
    // const avg_anti_ratio =
    //   avgObj.anti_count /
    //   this.props.data.length /
    //   (avgObj.m_count / this.props.data.length);

    return this.props.data.map((dt, index) => {
      return (
        <tr key={dt._id}>
          <td className='center'>{`${index + 1}위`}</td>
          <td className='center'>{`${(dt.anti_ratio * 100).toFixed(1)}%`}</td>
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
  render() {
    return (
      <section className='section-global'>
        <div className='keywords-table-container'>
          <table className='keywords-table'>
            <thead>
              <tr>
                <th className='center'>순위</th>
                <th className='center'>거부율</th>
                <th className='center'>날짜</th>
                <th className='center'>키워드 1</th>
                <th className='center'>키워드 2</th>
                <th className='center'>키워드 3</th>
                <th className='center'>키워드 4</th>
                <th className='center'>키워드 5</th>
              </tr>
            </thead>

            <tbody>{this.mapTbody()}</tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default KeywordsTable;
