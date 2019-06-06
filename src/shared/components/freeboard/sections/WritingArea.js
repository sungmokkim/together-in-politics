import React, { Component } from 'react';
import { connect } from 'react-redux';

class WritingArea extends Component {
  state = {
    modalDisplay: 'none',
    fullWidth: 0,
    rotation: 'forwards'
  };
  componentDidMount() {
    const fullWidth = document.getElementById('root').offsetWidth;
    this.setState({
      ...this.state,
      fullWidth,
      modalDisplay: 'none'
    });
  }

  controlModalDisplay = async () => {
    this.setState(
      {
        ...this.state,
        modalDisplay: 'block'
      },
      async () => {
        await setTimeout(() => {
          this.setState({
            ...this.state,
            modalDisplay: 'none'
          });
        }, 300);
      }
    );
  };

  toggleNewPostArea = () => {
    return (
      <div
        className={`single-post-overlay ${
          this.props.modalIsOpen ? 'opacity-fade-in' : 'opacity-fade-out'
        }`}
        style={{
          display: this.props.modalIsOpen ? 'block' : this.state.modalDisplay
        }}
        onClick={e => {
          if (
            e.target.className === 'single-post-overlay opacity-fade-in' ||
            e.target.className === 'single-post-relative' ||
            e.target.className === 'single-post-wrapper'
          ) {
            this.controlModalDisplay().then(() => {
              this.props.handleClosingModal();
            });
          }
        }}
      >
        <div className='single-post-relative'>
          <div
            className='single-post-wrapper'
            id='single-post-wrapper'
            style={{
              marginLeft: 0 - (this.state.fullWidth * 0.8) / 2
            }}
          >
            <div className='single-post-container'>
              <form className='input-form' onSubmit={this.props.handleSubmit}>
                <div className='user-and-password'>
                  <input
                    type='text'
                    name='userName'
                    placeholder={
                      this.props.freeboard.placeHolders.userName['korean']
                    }
                    value={this.props.inputs.userName}
                    onChange={this.props.handleChange}
                  />
                  <input
                    type='password'
                    name='password'
                    placeholder={
                      this.props.freeboard.placeHolders.password['korean']
                    }
                    value={this.props.inputs.password}
                    onChange={this.props.handleChange}
                  />
                </div>

                <div className='text-input-area'>
                  <textarea
                    name='text'
                    cols='20'
                    rows='5'
                    value={this.props.inputs.text}
                    onChange={this.props.handleChange}
                    placeholder={
                      this.props.freeboard.placeHolders.text['korean']
                    }
                  />
                </div>

                <div className='submit-btn-area'>
                  <span
                    className={`error-code-container status-very-bad ${
                      this.props.errorAnimation
                    }`}
                  >
                    {Object.keys(this.props.inputErrorCodes)
                      .filter(idx => {
                        return idx !== 'comment';
                      })
                      .map(idx => {
                        return (
                          <span
                            key={idx}
                            className='error-code status-very-bad'
                          >
                            {this.props.inputErrorCodes[idx]}
                          </span>
                        );
                      })}
                    {Object.keys(this.props.submitErrorCodes)
                      .filter(idx => {
                        return idx !== 'comment';
                      })
                      .map(idx => {
                        return (
                          <span
                            key={idx}
                            className='error-code status-very-bad'
                          >
                            {this.props.submitErrorCodes[idx]}
                          </span>
                        );
                      })}
                  </span>
                  <button className='submit-btn'>
                    {this.props.freeboard.submit['korean']}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  delayStoppingRotation = () => {
    this.setState(
      {
        ...this.state,
        rotation: 'infinite'
      },
      async () => {
        await setTimeout(() => {
          this.setState({
            ...this.state,
            rotation: 'forwards'
          });
        }, 1000);
      }
    );
  };
  render() {
    return (
      <div className='section-global writing-area'>
        <span className='indicator-btn-wrapper' style={{ marginRight: '2rem' }}>
          <span
            className='indicator-btn'
            onClick={() => {
              this.props.handleOpeningModal();
            }}
          >
            <span className='initial-display-wrapper'>
              <i className='fas fa-pen  active-element indicator-mark' />
            </span>
          </span>
        </span>

        <span className='indicator-btn-wrapper'>
          <span
            className='indicator-btn'
            onClick={() => {
              this.delayStoppingRotation();
              this.props.handleRefresh('posts');
            }}
          >
            <span className='initial-display-wrapper'>
              <i
                className={`fas fa-sync-alt active-element indicator-mark `}
                style={{
                  animation: `refresh-rotation 1s ease-in-out ${
                    this.props.loading ? 'infinite' : this.state.rotation
                  }`
                }}
              />
            </span>
          </span>
        </span>

        <span
          className='indicator-btn'
          onClick={() => {
            this.props.handleRefresh('posts');
          }}
        />
        {this.toggleNewPostArea()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    freeboard: state.freeboard
  };
};
export default connect(mapStateToProps)(WritingArea);
