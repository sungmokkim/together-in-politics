import React, { Component } from 'react';
import { connect } from 'react-redux';

class IndicatorBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      opacity: 0,
      toggle: true,
      hover: false,
      clientX: 0,
      clientY: 0,
      currentlyHovered: null,
      switch: {
        indicator: {
          icon: 'fas fa-tachometer-alt',
          names: 'lineChartIndicatorOptions'
        }
      }
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      body: document.body,
      opacity: 1
    });
  }

  handleSelectionClick = value => {
    this.props.handleClick(this.props.type, value);
    // this.toggleSelection();
  };

  getMousePosition = (e, index) => {
    if (!this.state.hover) {
      this.setState({
        ...this.state,
        clientX: e.clientX,
        clientY: e.clientY,
        hover: true,
        currentlyHovered: index
      });
    }
  };

  mapSelections = () => {
    const names = this.props.dashboardManager[
      this.state.switch[this.props.type]['names']
    ];
    return this.state.toggle
      ? Object.keys(names).map(targetName => {
          return (
            <span
              key={targetName}
              className={`selector-container normal selection-fade-in`}
              onClick={() => {
                this.handleSelectionClick(
                  this.props.valueIsObject ? names[targetName] : targetName
                );
              }}
              onMouseOver={e => {
                this.getMousePosition(e, targetName);
              }}
              onMouseLeave={() => {
                this.setState({
                  ...this.state,
                  hover: false,
                  currentlyHovered: null
                });
              }}
            >
              <span key={targetName} className={`normal-element`}>
                <i
                  className={`check-mark ${
                    names[targetName].checked
                      ? 'far fa-check-circle'
                      : 'far fa-circle'
                  }`}
                  style={{
                    animation: 'opacity-fade-in 0.2s ease-in forwards',
                    color: names[targetName].lineColor
                  }}
                />
                {names[targetName].koreanShort}
              </span>
            </span>
          );
        })
      : null;
  };

  toggleSelection = () => {
    this.setState({
      ...this.state,
      toggle: !this.state.toggle,
      opacity: this.state.opacity >= 1 ? 0.7 : 1,
      hover: this.state.hover ? false : null
    });
  };

  handleClickingBody = () => {
    // if (this.state.body) {
    //   this.state.body.addEventListener('click', e => {
    //     this.setState({
    //       ...this.state,
    //       toggle: false
    //     });
    //   });
    // }
  };
  render() {
    {
      this.handleClickingBody();
    }

    const activeValue = this.props.valueIsObject
      ? this.props.dashboardManager.active[this.props.type].index
      : this.props.dashboardManager.active[this.props.type];
    return (
      <span
        className={`indicator-btn-wrapper ${
          this.props.btnClicked ? 'selection-fade-in' : 'selection-fade-out'
        }`}
      >
        <span
          className={`indicator-btn ${this.state.toggle ? 'btn-fade-out' : ''}`}
          style={{
            opacity: this.state.opacity
          }}
          onClick={this.toggleSelection}
        >
          <span className='initial-display-wrapper'>
            <i
              className={`${
                this.state.switch[this.props.type].icon
              } indicator-mark`}
            />
            <span
              className='active-element'
              style={{ display: this.state.toggle ? 'none' : 'inline' }}
            >
              지표선택
            </span>
          </span>
        </span>

        {this.mapSelections()}

        {/* <span
          style={{
            opacity: this.state.hover ? 1 : 0,
            position: 'fixed',
            top: this.state.clientY - 35,
            left: this.state.clientX
          }}
          className='hover-description'
        >
          {this.state.currentlyHovered
            ? this.state.switch[this.props.type].names[
                this.state.currentlyHovered
              ].korean
            : null}
        </span> */}
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
};
export default connect(mapStateToProps)(IndicatorBtn);
