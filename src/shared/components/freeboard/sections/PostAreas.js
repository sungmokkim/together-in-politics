import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFreeboard } from '../../../actions/actions';
import SinglePost from './SinglePost';

class PostAreas extends Component {
  state = {
    modalDisplay: 'none',
    fullWidth: 0
  };

  componentDidMount() {
    this.props.fetchFreeboard();

    const fullWidth = document.getElementById('root').offsetWidth;
    this.setState({
      ...this.state,
      fullWidth,
      modalDisplay: 'none'
    });
  }

  getAdmin = post => {
    return post.admin ? <span className='user-admin'>Admin</span> : null;
  };

  mapPosts = () => {
    return this.props.freeboard.data.map(post => {
      return (
        <div
          key={post._id}
          className='post-container opacity-fade-in'
          onClick={() => {
            this.props.handleOpeningModal(post._id);
          }}
        >
          <span className='upper-container' key={post._id}>
            <span className='user-area'>
              <i className='fas fa-user' />
              {post.user}
              {this.getAdmin(post)}
            </span>

            <span className='date-and-ip-area'>
              <span className='post-date'>{post.post_date}</span>
              <span className='user-ip'>{post.ip || null}</span>
            </span>
          </span>

          <span className='lower-container'>
            <span className='text-area'>{post.text}</span>
            <span className='comment-count'>
              <i className='fas fa-comments' />
              {post.comments}
            </span>
          </span>
        </div>
      );
    });
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

  toggleSinglePostArea = () => {
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
            <SinglePost
              currentId={this.props.currentId}
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleSubmit}
              inputs={this.props.inputs}
              inputErrorCodes={this.props.inputErrorCodes}
              submitErrorCodes={this.props.submitErrorCodes}
              errorAnimation={this.props.errorAnimation}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.state.modalDisplay);
    return (
      <div className='section-global'>
        {this.toggleSinglePostArea()}
        <div className='freeboard-post-wrapper'>{this.mapPosts()}</div>
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
  { fetchFreeboard }
)(PostAreas);
