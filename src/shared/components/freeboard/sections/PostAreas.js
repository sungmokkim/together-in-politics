import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFreeboard } from '../../../actions/actions';

class PostAreas extends Component {
  componentDidMount() {
    this.props.fetchFreeboard();
  }

  mapPosts = () => {
    return this.props.freeboard.data.map(post => {
      return (
        <div key={post._id} className='post-container'>
          <span className='user-area'>{post.user}</span>

          <span className='text-area'> {post.text}</span>
        </div>
      );
    });
  };

  render() {
    return (
      <div className='section-global'>
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
