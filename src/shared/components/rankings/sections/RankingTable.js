import React, { Component } from 'react';

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

          {this.props.fieldOrder.map(field => {
            return <td className='center' key={field}>{`${dt[field]}%`}</td>;
          })}
        </tr>
      );
    });
  };

  mapThead = () => {
    return this.props.fieldOrder.map(field => {
      return (
        <th className='center' key={field}>
          {this.props.fieldNames[field]['korean']}
        </th>
      );
    });
  };
  render() {
    return (
      <section className='section-global'>
        <div className='ranking-table-container'>
          <table className='ranking-table'>
            <thead>
              <tr>
                <th className='center'>순위</th>
                <th className='center'>커뮤니티</th>
                {this.mapThead()}
              </tr>
            </thead>

            <tbody>{this.mapTbody()}</tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default RankingTable;
