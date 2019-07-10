import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PhotoCard extends Component {
  constructor(props) {
    super(props);

    // below sets interval for every few seconds
    // this will change the current state , background photos, and name displays
    // it was declared in construtor so that it can be removed(it can be approached) when this component gets unmounted
    this.indicatorArray = ['anti_ratio', 'popularity', 'femi_ratio'];
    this.state = {
      // for animation, the initial state should perform fade-in and fade-out animation together
      // (because setInterval is going to execute after 5 seconds of the initial mounting)
      // after that, when photos change, the animation fade-in and fade-out animation should perform separately
      animation: 'photo-in-out 5s ease-in normal',
      currentlyFocused: 'anti_ratio'
    };

    this.index = 1;

    this.loopArray = setInterval(() => {
      this.setState(
        {
          ...this.state,
          animation: 'photo-in 0.3s ease-in forwards',
          currentlyFocused: this.indicatorArray[
            this.index++ % this.indicatorArray.length
          ]
        },
        () => {
          setTimeout(() => {
            this.setState({
              ...this.state,
              animation: 'photo-out 0.3s ease-in forwards'
            });
          }, 4700);
        }
      );
    }, 5000);
  }

  componentWillUnmount() {
    // clear interval set in the constructor method
    // causes an error if not cleared
    clearInterval(this.loopArray);
  }
  render() {
    const {
      active,
      maxValues,

      todayIndicators
    } = this.props.dashboardManager;

    const currentValue = this.props.today.indicators.length
      ? this.props.today.indicators[0][this.state.currentlyFocused]
      : null;
    const currentMaxValue =
      maxValues[active.community.index][this.state.currentlyFocused];
    const indicatorName = todayIndicators[this.state.currentlyFocused].korean;

    return (
      <div className='section-global'>
        <div
          className='photo-card-container'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Link to='/dashboard'>
            <div id='photo-bg' className={`photo-card`}>
              <div
                className={`photo-section photo-${
                  this.state.currentlyFocused
                } `}
                style={{ animation: this.state.animation }}
              />
              <div className='phrase-container'>
                인터넷 커뮤니티 여론은 어떨까?
              </div>
              <div className='status-container'>
                <div className='status-bar'>
                  <div className='upper-container'>
                    {active.community.korean}
                  </div>
                  <div
                    className={`lower-container`}
                    style={{ animation: this.state.animation }}
                  >
                    <span
                      className={`indicator-name photo-card-${
                        this.state.currentlyFocused
                      }`}
                    >
                      {indicatorName}
                    </span>

                    <span className={`indicator-value `}>
                      <span className='value'>
                        {((currentValue / currentMaxValue) * 100).toFixed(2)}
                      </span>

                      <span className='metric'>%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
};

export default connect(mapStateToProps)(PhotoCard);
