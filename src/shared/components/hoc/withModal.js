import React, { Component } from 'react';
import ConfigBtn from '../common/ConfigBtn';

export default setting => WrappedComponent => {
  return class extends Component {
    state = {
      btnClicked: false,
      modalDisplay: 'none',
      isMounted: false,
      componentDisplay: false
    };

    componentDidMount() {
      this.setState({
        ...this.state,
        isMounted: true
      });
    }
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
            document.body.style.overflow = 'hidden';
          } else {
            this.controlModalFadeOut();
            document.body.style.overflow = 'auto';
          }
        }
      );
    };

    controlModalFadeOut = () => {
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
            {/* wrappedComponent will display if state's componentDisplay is true */}
            {/* this is due to fade out animation (wrapped component should execute animation first before it unmounts) */}
            {this.state.componentDisplay ? (
              <WrappedComponent
                btnClicked={this.state.btnClicked}
                {...this.props}
              />
            ) : null}
            {/* config button  */}
            {setting.configBtn ? (
              <ConfigBtn handleClick={this.toggleBtn} />
            ) : null}
          </div>
        </React.Fragment>
      );
    }
  };
};
