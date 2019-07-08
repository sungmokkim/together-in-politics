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
import { clientFetchingReference, protocol } from '../../../clientEnv';
import io from 'socket.io-client';

class FreeBoardSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      newPostCount: 0
    };
    // set socket object here so that it can be referenced throughout other actions and functions
    this.socket = io.connect(`${protocol}://${clientFetchingReference}`);
  }

  componentDidMount() {
    // following code is to add eventListener to the websocket created in constructor method.
    this.socket.on('new-post', newPostCount => {
      // when someone writes new post, set new post count value
      this.setState({
        ...this.state,
        newPostCount: this.state.newPostCount + 1
      });
    });

    this.socket.on('clear-post-count', newPostCount => {
      // set newPostCount to 0
      this.setState({
        ...this.state,
        newPostCount: 0
      });
    });
  }

  componentWillUnmount() {}

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

    // when a user presses submit button,
    // there should be checking process first
    const { minLength, errorCodes } = this.props.freeboard;

    // check if any of input errors exist

    // filter anything but comment error into an array
    const inputErrors = Object.keys(this.state.inputErrorCodes).filter(idx => {
      return idx !== 'comment' && this.state.inputErrorCodes[idx];
    });

    // if the array has a length (it means some errors exist)
    if (inputErrors.length) {
      // return(don't do anything)
      return;
    }

    // check if input length is shorter than minimun length
    const submissionErrors = Object.keys(this.state.inputs).filter(idx => {
      return (
        idx !== 'comment' && this.state.inputs[idx].length < minLength[idx]
      );
    });

    // if some errors exist, set error message and return(do not do anything)
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
    }

    // if nothing happens, post goes to database and posting process is successful
    this.props.insertInFreeboard(this.state.inputs, this.socket).then(rs => {
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
        postId ? this.props.fetchComments(postId, this.socket) : null;

        document.body.style.overflow = 'hidden';
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
        this.props.fetchFreeboard(this.socket);
        this.props.fetchHotPosts();

        document.body.style.overflow = 'auto';
      }
    );
  };

  handleCommentSubmit = e => {
    e.preventDefault();

    // when a user presses submit button,
    // there should be checking process first
    const { minLength, errorCodes } = this.props.freeboard;

    // check if any of input errors exist

    // filter anything but text(post) error into an array
    const inputErrors = Object.keys(this.state.inputErrorCodes).filter(idx => {
      return idx !== 'text' && this.state.inputErrorCodes[idx];
    });
    // if the array has a length (it means some errors exist)
    if (inputErrors.length) {
      // return (don't do anything)
      return;
    }

    // check if input length is shorter than minimun length
    const submissionErrors = Object.keys(this.state.inputs).filter(idx => {
      return idx !== 'text' && this.state.inputs[idx].length < minLength[idx];
    });

    // if some errors exist, set error message and return(do not do anything)
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
    }

    // if nothing happens, post goes to database and posting process is successful
    this.props
      .updateNewComment(
        {
          ...this.state.inputs,
          inputId: this.state.currentId
        },
        this.socket
      )
      .then(rs => {
        if (rs.ok === 1) {
          this.props.fetchComments(this.state.currentId, this.socket);
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
  };

  handleRefresh = type => {
    switch (type) {
      case 'posts':
        this.setState(
          {
            ...this.state,
            loading: true
          },
          async () => {
            await this.props.fetchFreeboard(this.socket);
            await this.props.fetchHotPosts();

            this.setState({
              ...this.state,
              loading: false
            });
          }
        );

        break;
      case 'comments':
        this.setState(
          {
            ...this.state,
            loading: true
          },
          async () => {
            await this.props.fetchComments(this.state.currentId, this.socket);
            await this.props.fetchFreeboard(this.socket);
            await this.props.fetchHotPosts();

            this.setState({
              ...this.state,
              loading: false
            });
          }
        );

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
          newPostCount={this.state.newPostCount}
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
          socket={this.socket}
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
