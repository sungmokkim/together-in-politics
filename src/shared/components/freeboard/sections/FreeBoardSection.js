import React, { Component } from 'react';
import WritingArea from './WritingArea';
import PostAreas from './PostAreas';
import HotPostArea from './HotPostArea';
import { connect } from 'react-redux';
import {
  insertInFreeboard,
  fetchFreeboard,
  updateNewComment,
  fetchComments,
  fetchHotPosts
} from '../../../actions/actions';
class FreeBoardSection extends Component {
  state = {
    inputs: {
      text: '',
      userName: '',
      password: '',
      comment: ''
    },
    inputErrorCodes: {
      text: null,
      userName: null,
      password: null,
      comment: null
    },
    submitErrorCodes: {},
    errorAnimation: null,
    currentId: null,
    singlePostModalToggled: false,
    newPostModalToggled: false,
    loading: false,
    modalDisplay: 'none',
    fullWidth: 0
  };

  componentDidMount() {
    const fullWidth = document.getElementById('root').offsetWidth;
    this.setState({
      ...this.state,
      fullWidth,
      modalDisplay: 'none'
    });
  }

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

  handlePostSubmit = e => {
    e.preventDefault();

    const { minLength, errorCodes } = this.props.freeboard;
    const inputErrors = Object.keys(this.state.inputErrorCodes).filter(idx => {
      return idx !== 'comment' && this.state.inputErrorCodes[idx];
    });

    if (inputErrors.length) {
      return;
    }

    const submissionErrors = Object.keys(this.state.inputs).filter(idx => {
      return (
        idx !== 'comment' && this.state.inputs[idx].length < minLength[idx]
      );
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
          this.handleClosingModal();

          this.setState({
            ...this.state,
            submitErrorCodes: {},
            errorAnimation: null,
            inputs: {
              ...this.state.inputs,
              text: ''
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

  handleOpeningModal = (postId = null) => {
    const modalTogglingKey = postId
      ? 'singlePostModalToggled'
      : 'newPostModalToggled';
    this.setState(
      {
        ...this.state,
        currentId: postId || null,
        [modalTogglingKey]: true
      },
      () => {
        postId ? this.props.fetchComments(postId) : null;

        this.props.siteManager.isFromClient
          ? (document.body.style.overflow = 'hidden')
          : null;
      }
    );
  };

  handleClosingModal = () => {
    this.setState(
      {
        ...this.state,
        singlePostModalToggled: false,
        newPostModalToggled: false,
        submitErrorCodes: {},
        errorAnimation: null
      },
      () => {
        this.props.fetchFreeboard();
        this.props.fetchHotPosts();
        if (this.props.siteManager.isFromClient) {
          document.body.style.overflow = 'scroll';
        }
      }
    );
  };

  handleCommentSubmit = e => {
    e.preventDefault();
    const { minLength, errorCodes } = this.props.freeboard;
    const inputErrors = Object.keys(this.state.inputErrorCodes).filter(idx => {
      return idx !== 'text' && this.state.inputErrorCodes[idx];
    });

    if (inputErrors.length) {
      return;
    }

    const submissionErrors = Object.keys(this.state.inputs).filter(idx => {
      return idx !== 'text' && this.state.inputs[idx].length < minLength[idx];
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
      this.props
        .updateNewComment({
          ...this.state.inputs,
          inputId: this.state.currentId
        })
        .then(rs => {
          if (rs.ok === 1) {
            this.props.fetchComments(this.state.currentId);
            this.setState({
              ...this.state,
              submitErrorCodes: {},
              errorAnimation: null,
              inputs: {
                ...this.state.inputs,
                comment: ''
              },
              inputErrorCodes: {
                comment: null,
                userName: null,
                password: null
              }
            });
          }
        });
    }
  };

  handleRefresh = type => {
    switch (type) {
      case 'posts':
        this.props.fetchFreeboard();
        this.props.fetchHotPosts();
        break;
      case 'comments':
        this.props.fetchComments(this.state.currentId);
        this.props.fetchFreeboard();
        this.props.fetchHotPosts();
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
        <HotPostArea
          currentId={this.state.currentId}
          handleOpeningModal={this.handleOpeningModal}
          modalIsOpen={this.state.singlePostModalToggled}
          handleClosingModal={this.handleClosingModal}
        />
        <WritingArea
          handleChange={this.handleChange}
          handleSubmit={this.handlePostSubmit}
          inputs={this.state.inputs}
          inputErrorCodes={this.state.inputErrorCodes}
          submitErrorCodes={this.state.submitErrorCodes}
          errorAnimation={this.state.errorAnimation}
          handleOpeningModal={this.handleOpeningModal}
          modalIsOpen={this.state.newPostModalToggled}
          handleClosingModal={this.handleClosingModal}
          handleRefresh={this.handleRefresh}
          loading={this.state.loading}
        />
        <PostAreas
          handleChange={this.handleChange}
          handleSubmit={this.handleCommentSubmit}
          currentId={this.state.currentId}
          handleOpeningModal={this.handleOpeningModal}
          inputs={this.state.inputs}
          inputErrorCodes={this.state.inputErrorCodes}
          submitErrorCodes={this.state.submitErrorCodes}
          errorAnimation={this.state.errorAnimation}
          modalIsOpen={this.state.singlePostModalToggled}
          handleClosingModal={this.handleClosingModal}
          handleRefresh={this.handleRefresh}
          loading={this.state.loading}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    freeboard: state.freeboard,
    siteManager: state.siteManager
  };
};
export default connect(
  mapStateToProps,
  {
    fetchFreeboard,
    insertInFreeboard,
    updateNewComment,
    fetchComments,
    fetchHotPosts
  }
)(FreeBoardSection);
