import React, { Component } from 'react';
import ConfigBtn from '../common/ConfigBtn';

export default setting => WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <React.Fragment>
          {/* overlay to display when config button is clicked */}
          <div
            className={
              //render different animation depending on the current state
              this.props.clicked ? 'opacity-fade-in' : 'opacity-fade-out'
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
              display: this.props.modalDisplay
            }}
            onClick={this.props.controlModalFadeOut}
          />
          <div className={setting.fixedPositionClassName}>
            {/* render wrapped Component based via this function */}

            {/* this div is to make display block and none depending on the current state */}
            <div style={{ display: this.props.modalDisplay }}>
              <WrappedComponent
                btnClicked={this.props.clicked}
                {...this.props}
              />
            </div>

            {/* config button  */}
            {setting.configBtn ? (
              <ConfigBtn
                handleClick={this.props.toggleBtn}
                btnClicked={this.props.clicked}
              />
            ) : null}
          </div>
        </React.Fragment>
      );
    }
  };
};
