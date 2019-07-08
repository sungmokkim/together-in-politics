import React, { Component } from 'react';
import { connect } from 'react-redux';
import RefreshBtn from '../../common/RefreshBtn';

class WritingArea extends Component {
  state = {
    modalDisplay: 'none',

    rotation: 'forwards'
  };

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
        className={`single-post-overlay writing-post-area ${
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
          <div className='single-post-wrapper' id='single-post-wrapper'>
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

  render() {
    return (
      <React.Fragment>
        {/* only display refresh button when new post count > 0 */}
        {this.props.newPostCount > 0 ? (
          <RefreshBtn
            loading={this.props.loading}
            handleRefresh={this.props.handleRefresh}
            type='posts'
            suffix='개의 새 게시물'
            count={this.props.newPostCount}
          />
        ) : null}

        <span className='writing-container' style={{ marginRight: '2rem' }}>
          <span
            className='writing-btn'
            onClick={() => {
              this.props.modalIsOpen
                ? this.controlModalDisplay().then(() => {
                    this.props.handleClosingModal();
                  })
                : this.props.handleOpeningModal();
            }}
          >
            <span className='initial-display-wrapper'>
              <i
                className={`${
                  this.props.modalIsOpen ? 'fas fa-times' : 'fas fa-pen'
                }  active-element writing-icon`}
              />
            </span>
          </span>
        </span>
        {this.toggleNewPostArea()}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    freeboard: state.freeboard
  };
};
export default connect(mapStateToProps)(WritingArea);
