import React, { Component } from 'react';
import ConfigBtn from '../common/ConfigBtn';

export default setting => WrappedComponent => {
  return class extends Component {
    state = {
      btnClicked: false,
      modalDisplay: 'none',
      componentDisplay: false
    };

    toggleBtn = () => {
      this.setState(
        {
          ...this.state,
          btnClicked: !this.state.btnClicked
        },
        () => {
          if (this.state.btnClicked) {
            this.setState({
              ...this.state,
              modalDisplay: 'block',
              componentDisplay: true
            });
            // document.body.style.overflow = 'hidden';
          } else {
            this.controlModalFadeOut();
          }
        }
      );
    };

    controlModalFadeOut = () => {
      // give delay of 0.3s to perform fade-out animation
      // document.body.style.overflow = 'auto';
      this.setState(
        {
          ...this.state,
          modalDisplay: 'block',
          btnClicked: false,
          componentDisplay: true
        },
        async () => {
          await setTimeout(() => {
            this.setState({
              ...this.state,
              modalDisplay: 'none',
              btnClicked: false,
              componentdisplay: false
            });
          }, 300);
        }
      );
    };

    render() {
      return (
        <React.Fragment>
          {/* overlay to display when config button is clicked */}
          <div
            className={
              //render different animation depending on the current state
              this.state.btnClicked ? 'opacity-fade-in' : 'opacity-fade-out'
            }
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              position: 'fixed',
              zIndex: '2',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              // only display dark overlay when button is clicked
              display: this.state.modalDisplay
            }}
            onClick={this.controlModalFadeOut}
          />
          <div className={setting.fixedPositionClassName}>
            {/* render wrapped Component based via this function */}

            {/* this div is to make display block and none depending on the current state */}
            <div style={{ display: this.state.modalDisplay }}>
              <WrappedComponent
                btnClicked={this.state.btnClicked}
                {...this.props}
              />
            </div>

            {/* config button  */}
            {setting.configBtn ? (
              <ConfigBtn
                handleClick={this.toggleBtn}
                btnClicked={this.state.btnClicked}
              />
            ) : null}
          </div>
        </React.Fragment>
      );
    }
  };
};
