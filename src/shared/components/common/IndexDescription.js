import React, { Component } from 'react';
import withModal from '../hoc/withModal';

class IndexDescription extends Component {
  mapList = () => {
    return Object.keys(this.props.list).map(key => {
      const dt = this.props.list[key];
      return (
        <div key={dt.index} className='indicator'>
          <div className='upper-container'>
            <span className={`icon`}>
              <i className={`${dt.icon} ${dt.colorClassName}`} />
            </span>
            <span className='name'> {dt.name}</span>
          </div>

          <div className='lower-container'>
            <p>{dt.desc['korean']}</p>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div
        className={`description-container ${
          this.props.btnClicked ? 'opacity-fade-in' : 'opacity-fade-out'
        }`}
        onClick={e => {
          if (e.target.className === 'index-wrapper') {
            // only close the modal when the black screen is clicked.
            this.props.controlModalFadeOut(this.props.toggleType);
          }
        }}
      >
        <div className='index-wrapper'>
          <div className='index-container'>{this.mapList()}</div>
        </div>
      </div>
    );
  }
}

export default withModal({
  configBtn: false,
  fixedPositionClassName: null
})(IndexDescription);
