import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertInFreeboard, fetchFreeboard } from '../../../actions/actions';

class WritingArea extends Component {
  state = {
    inputs: {
      text: '',
      userName: '',
      password: ''
    },
    inputErrorCodes: {
      text: null,
      userName: null,
      password: null
    },
    submitErrorCodes: {},
    errorAnimation: null
  };

  handleChange = e => {
    const { inputIsTooLong } = this.props.freeboard.errorCodes;

    const { maxLength, minLength } = this.props.freeboard;

    if (e.target.value.length <= maxLength[e.target.name]) {
      this.setState({
        ...this.state,
        inputs: {
          ...this.state.inputs,
          [e.target.name]: e.target.value
        },
        inputErrorCodes: {
          ...this.state.inputErrorCodes,
          [e.target.name]: null
        },
        errorAnimation: null,

        submitErrorCodes: {
          ...this.state.submitErrorCodes,
          [e.target.name]:
            e.target.value.length >= minLength[e.target.name]
              ? null
              : this.state.submitErrorCodes[e.target.name]
        }
      });
    } else {
      this.setState({
        ...this.state,
        inputs: {
          ...this.state.inputs,
          [e.target.name]: e.target.value.slice(0, maxLength[e.target.name])
        },

        inputErrorCodes: {
          ...this.state.inputErrorCodes,
          [e.target.name]: inputIsTooLong['korean'][e.target.name]
        },
        errorAnimation: 'error-animation'
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { minLength, errorCodes } = this.props.freeboard;
    const inputErrors = Object.keys(this.state.inputErrorCodes).filter(idx => {
      return this.state.inputErrorCodes[idx];
    });

    if (inputErrors.length) {
      return;
    }

    const submissionErrors = Object.keys(this.state.inputs).filter(idx => {
      return this.state.inputs[idx].length < minLength[idx];
    });

    if (submissionErrors.length) {
      const submitErrorObj = {};

      submissionErrors.forEach(idx => {
        submitErrorObj[idx] = errorCodes.inputIsTooShort['korean'][idx];
      });

      this.setState({
        ...this.state,
        submitErrorCodes: submitErrorObj,
        errorAnimation: 'error-animation'
      });
      return;
    } else {
      this.props.insertInFreeboard(this.state.inputs).then(rs => {
        if (rs.ok === 1) {
          this.props.fetchFreeboard();
          this.setState({
            ...this.state,
            submitErrorCodes: {},
            errorAnimation: null,
            inputs: {
              ...this.state.inputs,
              text: '',
              password: ''
            },
            inputErrorCodes: {
              text: null,
              userName: null,
              password: null
            }
          });
        }
      });
    }
  };
  render() {
    return (
      <div className='section-global'>
        <form className='freeboard-form' onSubmit={this.handleSubmit}>
          <div className='input-area'>
            <div className='user-password'>
              <input
                type='text'
                name='userName'
                placeholder={
                  this.props.freeboard.placeHolders.userName['korean']
                }
                value={this.state.inputs.userName}
                onChange={this.handleChange}
              />
              <input
                type='password'
                name='password'
                placeholder='비번'
                value={this.state.inputs.password}
                onChange={this.handleChange}
              />
            </div>
            <textarea
              className='text-input-area'
              name='text'
              cols='30'
              rows='5'
              value={this.state.inputs.text}
              onChange={this.handleChange}
              placeholder={this.props.freeboard.placeHolders.text['korean']}
            />
          </div>

          <div className='submit-btn-area'>
            <span
              className={`error-code status-very-bad ${
                this.state.errorAnimation
              }`}
            >
              {Object.keys(this.state.inputErrorCodes).map(idx => {
                return (
                  <span key={idx} className='error-code status-very-bad'>
                    {this.state.inputErrorCodes[idx]}
                  </span>
                );
              })}
              {Object.keys(this.state.submitErrorCodes).map(idx => {
                return (
                  <span key={idx} className='error-code status-very-bad'>
                    {this.state.submitErrorCodes[idx]}
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
    );
  }
}
const mapStateToProps = state => {
  return {
    freeboard: state.freeboard
  };
};
export default connect(
  mapStateToProps,
  { insertInFreeboard, fetchFreeboard }
)(WritingArea);
