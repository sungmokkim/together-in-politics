import React from 'react';

export default () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className='section-global footer-content'>
        &copy; {year} 모두의 정치
      </div>
    </footer>
  );
};
