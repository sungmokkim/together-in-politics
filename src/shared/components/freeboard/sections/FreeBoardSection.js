import React, { Component } from 'react';
import WritingArea from './WritingArea';
import PostAreas from './PostAreas';

class FreeBoardSection extends Component {
  render() {
    return (
      <React.Fragment>
        <WritingArea />
        <PostAreas />
      </React.Fragment>
    );
  }
}

export default FreeBoardSection;
