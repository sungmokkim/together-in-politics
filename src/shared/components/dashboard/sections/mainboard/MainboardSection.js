import React, { Component } from 'react';
import MainBoard from './MainBoard';

class MainBoardSection extends Component {
  render() {
    return (
      <section className='section-global section-max-width'>
        <MainBoard />
      </section>
    );
  }
}

export default MainBoardSection;
