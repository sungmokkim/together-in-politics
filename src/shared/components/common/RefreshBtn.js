import React, { Component } from 'react';

class RefreshBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClicked: false,
      rotation: 'forwards'
    };
  }
  //   delayStoppingRotation = () => {
  //     this.setState(
  //       {
  //         ...this.state,
  //         rotation: 'infinite'
  //       },
  //       async () => {
  //         await setTimeout(() => {
  //           this.setState({
  //             ...this.state,
  //             rotation: 'forwards'
  //           });
  //         }, 1000);
  //       }
  //     );
  //   };
  render() {
    return (
      <span
        className='indicator-btn-wrapper'
        style={{ justifyContent: 'center' }}
      >
        <span
          className='indicator-btn'
          style={{ animation: 'opacity-fade-in 1s ease-in forwards' }}
          onClick={() => {
            this.props.handleRefresh(this.props.type);
          }}
        >
          <span className='initial-display-wrapper'>
            <i
              className={`fas fa-sync-alt active-element indicator-mark`}
              style={{
                animation: `refresh-rotation 1s ease-in-out ${
                  this.props.loading ? 'infinite' : 'forwards'
                }`
              }}
            />
            <span style={{ fontSize: '1.8rem' }}>{`${this.props.count}${
              this.props.suffix
            }`}</span>
          </span>
        </span>
      </span>
    );
  }
}
export default RefreshBtn;
