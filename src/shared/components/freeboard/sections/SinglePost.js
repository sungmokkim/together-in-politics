import React, { Component } from 'react';
import { connect } from 'react-redux';
import RefreshBtn from '../../common/RefreshBtn';

class SinglePost extends Component {
  state = {
    commentFormIsOn: false,
    newCommentCount: 0
  };

  incrementNewCommentCount = () => {
    this.setState({
      ...this.state,
      newCommentCount: this.state.newCommentCount + 1
    });
  };

  resetNewCommentCount = () => {
    this.setState({
      ...this.state,
      newCommentCount: 0
    });
  };
  componentDidMount() {
    this.props.socket.emit('open-single-post', this.props.currentId);

    // when this post gets a new comment, set comment count state +1
    this.props.socket.on('new-comment', this.incrementNewCommentCount);
    // when the user fetches comment data , reset comment count state to 0
    this.props.socket.on('clear-comment-count', this.resetNewCommentCount);
  }

  componentWillUnmount() {
    // when this component unmounts, tell socket to leave the room
    this.props.socket.emit('close-single-post', this.props.currentId);

    // detach socket event listeners when the component unmounts
    this.props.socket.off('new-comment', this.incrementNewCommentCount);
    this.props.socket.off('clear-comment-count', this.resetNewCommentCount);
  }

  getAdmin = post => {
    return post.admin ? <span className='user-admin'>Admin</span> : null;
  };

  mapPost = () => {
    const toMap = this.props.freeboard.data.filter(post => {
      return post._id === this.props.currentId;
    }).length
      ? this.props.freeboard.data.filter(post => {
          return post._id === this.props.currentId;
        })
      : this.props.freeboard.hotPosts.filter(post => {
          return post._id === this.props.currentId;
        });

    return toMap.map(post => {
      return (
        <div key={post._id} className='post-container'>
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
          </span>
        </div>
      );
    });
  };

  mapComments = () => {
    const { comments } = this.props.freeboard;

    return comments.map(comment => {
      return (
        <div key={comment._id} className='comment-area opacity-fade-in'>
          <div className='upper-container'>
            <span className='user-area'>
              <i className='fas fa-comment' />
              {comment.user}
              {this.getAdmin(comment)}
            </span>

            <span className='date-and-ip-area'>
              <span className='post-date'>{comment.post_date}</span>
              <span className='user-ip'>{comment.ip || null}</span>
            </span>
          </div>

          <div className='lower-container'>
            <span className='text-area'>{comment.comment}</span>
          </div>
        </div>
      );
    });
  };

  handleClick = () => {
    this.setState({
      ...this.state,
      commentFormIsOn: !this.state.commentFormIsOn
    });
  };
  render() {
    return (
      <div className='single-post-container'>
        {this.mapPost()}

        <div className='comment-container'>
          <div className='comment-count'>
            {`Comments (${this.props.freeboard.comments['length']})`}
          </div>
          {this.props.freeboard.comments.length ? (
            this.mapComments()
          ) : (
            <span className='no-comment'>
              {this.props.freeboard.status.noComment['korean']}
            </span>
          )}
        </div>

        {this.state.newCommentCount > 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <RefreshBtn
              loading={this.props.loading}
              handleRefresh={this.props.handleRefresh}
              type='comments'
              suffix='개의 새 댓글'
              count={this.state.newCommentCount}
            />
          </div>
        ) : null}

        <span
          className='indicator-btn-wrapper'
          style={{ justifyContent: 'center' }}
        >
          <span
            className='indicator-btn'
            onClick={this.handleClick}
            style={{ fontSize: '1.8rem' }}
          >
            <i
              className={`${
                this.state.commentFormIsOn ? 'fas fa-times' : 'fas fa-pen'
              } indicator-mark`}
              style={{ fontSize: '1.8rem' }}
            />
            {this.state.commentFormIsOn
              ? this.props.freeboard.hideElement['korean']
              : this.props.freeboard.writeComment['korean']}
          </span>
        </span>

        <form
          className='input-form'
          onSubmit={this.props.handleSubmit}
          style={{ display: this.state.commentFormIsOn ? 'block' : 'none' }}
        >
          <div className='user-and-password'>
            <input
              type='text'
              name='userName'
              placeholder={this.props.freeboard.placeHolders.userName['korean']}
              value={this.props.inputs.userName}
              onChange={this.props.handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder={this.props.freeboard.placeHolders.password['korean']}
              value={this.props.inputs.password}
              onChange={this.props.handleChange}
            />
          </div>

          <div className='text-input-area'>
            <textarea
              name='comment'
              cols='20'
              rows='3'
              value={this.props.inputs.comment}
              onChange={this.props.handleChange}
              placeholder={this.props.freeboard.placeHolders.comment['korean']}
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
                  return idx !== 'text';
                })
                .map(idx => {
                  return (
                    <span key={idx} className='error-code status-very-bad'>
                      {this.props.inputErrorCodes[idx]}
                    </span>
                  );
                })}
              {Object.keys(this.props.submitErrorCodes)
                .filter(idx => {
                  return idx !== 'text';
                })
                .map(idx => {
                  return (
                    <span key={idx} className='error-code status-very-bad'>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    freeboard: state.freeboard
  };
};
export default connect(mapStateToProps)(SinglePost);
