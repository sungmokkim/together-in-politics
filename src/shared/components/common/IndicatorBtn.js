import React, { Component } from 'react';
import { connect } from 'react-redux';

class IndicatorBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      opacity: 0,
      toggle: false,
      hover: false,
      clientX: 0,
      clientY: 0,
      currentlyHovered: null,
      switch: {
        community: {
          toMap: this.mapSelections,
          icon: 'fas fa-tasks',
          names: this.props.dashboardManager.communities,
          shape: 'circle',
          toggle: this.toggleSelection
        },
        indicator: {
          toMap: this.mapSelections,
          icon: 'fas fa-tachometer-alt',
          names: this.props.dashboardManager.dashboardIndicatorsName,
          shape: 'normal',
          toggle: this.toggleSelection
        },

        chart: {
          toMap: this.mapSelections,
          icon: 'fas fa-chart-bar',
          names: this.props.dashboardManager.chartName,
          shape: 'normal',
          toggle: this.toggleSelection
        },

        range: {
          toMap: this.mapSelections,
          icon: 'far fa-clock',
          names: this.props.dashboardManager.rangeOptions,
          shape: 'normal',
          toggle: this.toggleSelection
        },
        period: {
          toMap: this.mapSelections,
          icon: 'far fa-clock',
          names: this.props.dashboardManager.periodOptions,
          shape: 'normal',
          toggle: this.toggleSelection
        },
        bubblePeriod: {
          toMap: this.mapSelections,
          icon: 'far fa-clock',
          names: this.props.dashboardManager.bubblePeriodOptions,
          shape: 'normal',
          toggle: this.toggleSelection
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
    this.toggleSelection();
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
    const { names, shape } = this.state.switch[this.props.type];
    return this.state.toggle
      ? Object.keys(names).map(targetName => {
          return (
            <span
              key={targetName}
              className={`selector-container ${shape} selection-fade-in`}
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
              <span key={targetName} className={`${shape}-element`}>
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
    //     console.log(e.target);
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
      <span className='indicator-btn-wrapper'>
        <span
          className={`indicator-btn ${this.state.toggle ? 'btn-fade-out' : ''}`}
          style={{
            opacity: this.state.opacity
          }}
          onClick={this.state.switch[this.props.type].toggle}
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
              {`${
                this.state.switch[this.props.type]['names'][activeValue].korean
              }`}
            </span>
          </span>
        </span>

        {this.state.switch[this.props.type].toMap()}

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
