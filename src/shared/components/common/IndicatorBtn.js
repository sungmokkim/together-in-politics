import React, { Component } from 'react';
import { connect } from 'react-redux';

class IndicatorBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          shortNames: this.props.dashboardManager.communitiesShortNames,
          longNames: this.props.dashboardManager.communities,
          shape: 'circle'
        },
        indicator: {
          toMap: this.mapSelections,
          icon: 'fas fa-tachometer-alt',
          shortNames: this.props.dashboardManager.dashboardIndicatorsShortNames,
          longNames: this.props.dashboardManager.dashboardIndicatorsName,
          shape: 'normal'
        },
        range: {
          toMap: this.mapSelections,
          icon: 'far fa-clock',
          shortNames: this.props.dashboardManager.dashboardIndicatorsShortNames,
          longNames: this.props.dashboardManager.dashboardIndicatorsName,
          shape: 'normal'
        }
      }
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
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
    const { shortNames, shape } = this.state.switch[this.props.type];
    return this.state.toggle
      ? Object.keys(shortNames).map(shortName => {
          return (
            <span
              key={shortName}
              className={`selector-container ${shape} selection-fade-in`}
              onClick={() => {
                this.handleSelectionClick(shortName);
              }}
              onMouseOver={e => {
                this.getMousePosition(e, shortName);
              }}
              onMouseLeave={() => {
                this.setState({
                  ...this.state,
                  hover: false,
                  currentlyHovered: null
                });
              }}
            >
              <span key={shortName} className={`${shape}-element`}>
                {shortNames[shortName]}
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

  render() {
    const { active } = this.props.dashboardManager;
    return (
      <span className='indicator-btn-wrapper'>
        <span
          className='indicator-btn'
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
              {`${
                this.state.switch[this.props.type]['longNames'][
                  active[this.props.type]
                ]
              }`}
            </span>
          </span>
        </span>
        {this.state.switch[this.props.type].toMap()}
        <span
          style={{
            opacity: this.state.hover ? 1 : 0,
            position: 'absolute',
            top: this.state.clientY + 20,
            left: this.state.clientX
          }}
          className='hover-description'
        >
          {
            this.state.switch[this.props.type]['longNames'][
              this.state.currentlyHovered
            ]
          }
        </span>
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
