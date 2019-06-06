import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotPosts } from '../../../actions/actions';
class HotPostArea extends Component {
  state = {
    modalDisplay: 'none',
    fullWidth: 0
  };

  componentDidMount() {
    this.props.fetchHotPosts();
  }

  mapHotPosts = () => {
    return this.props.freeboard.hotPosts.map(post => {
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
              <i className='fas fa-fire' />
              {post.user}
            </span>

            <span className='date-and-ip-area'>
              <span className='post-date'>{post.post_date.slice(0, 10)}</span>
            </span>
          </span>

          <span className='lower-container'>
            <span className='text-area'>
              {post.text.length > 20
                ? `${post.text.slice(0, 20)}...`
                : post.text}
            </span>
            <span className='comment-count'>
              <i className='fas fa-comments' />
              {post.comments}
            </span>
          </span>
        </div>
      );
    });
  };
  render() {
    console.log(this.props.freeboard.hotPosts);
    return (
      <div className='section-global'>
        <div className='hot-post-wrapper'>{this.mapHotPosts()}</div>
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
  { fetchHotPosts }
)(HotPostArea);
