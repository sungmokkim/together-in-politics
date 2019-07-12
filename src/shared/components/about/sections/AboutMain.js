import React from 'react';

export default () => {
  return (
    <section className='section-global'>
      <div className='about-wrapper'>
        <h1 className='about-title'>
          <i className='fas fa-question' />
          About Us
        </h1>
        <article className='about'>
          <p>
            <i>모두의 정치</i> 에서는 우리나라에서 가장 이용자가 많은 커뮤니티의
            여론의 추이를 분석하여 지금까지 제대로 알기 힘들었던 10대에서
            40대까지의 생각을 볼 수 있습니다.
          </p>
          <p>
            <i>모두의 정치</i> 에서만 볼 수 있는 다양한 지표는 대통령에 대한
            호감이나 지지율 그리고 뜨거운 이슈로 떠오른 페미니즘에 대한 여론을
            짐작할 수 있게 합니다.
          </p>
        </article>
        <br />
        <article className='about'>
          <p>
            <i>Together-In-Politics(TIPS)</i> analyzes popular Korean internet
            communities to find out trends in public sentiments from teenagers
            to forties, which has been quite difficult to know until now.
          </p>
          <p>
            <i>TIPS</i> offers unique and diverse indicators to give insights
            regarding several aspects of Korean society such as approval
            ratings, the ratio of favorable responses on the president, and
            people's thoughts on feminism.
          </p>
        </article>
      </div>
    </section>
  );
};
