import React from 'react';

// tokenized words are not perfect. The tokenizer might slice /split words that should not be spliced / splited
// this function is to fix some of important words
// for now , this is 100% manual
export const fixWords = word => {
  switch (word) {
    case '한당':
      return '자한당';
    case '혜원':
      return '손혜원';
    case '의겸':
      return '김의겸';
    case '북유':
      return '북유게';
    case '지율':
      return '지지율';
    case '노자':
      return '외노자';
    default:
      return word;
  }
};

// this function maps <a> tag to the word given
export default (word, community) => {
  const fixedWord = fixWords(word);

  switch (community) {
    // map different links based on a given community
    case 'ygosu':
      return (
        <a
          href={`https://www.ygosu.com/community/?bid=yeobgi&searcht=s&add_search_log=Y&search=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
    case 'mlbpark':
      return (
        <a
          href={`http://mlbpark.donga.com/mp/b.php?select=sct&m=search&b=bullpen&select=sct&query=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
    case 'cook':
      return (
        <a
          href={`https://www.82cook.com/entiz/enti.php?bn=15&searchType=search&search1=1&keys=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
    case 'ilbe':
      return (
        <a
          href={`https://www.ilbe.com/list/politics?listStyle=list&searchType=title_content&search=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
    case 'clien':
      return (
        <a
          href={`https://www.clien.net/service/search?sort=recency&boardCd=park&isBoard=true&q=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
    case 'ruli':
      return (
        <a
          href={`http://bbs.ruliweb.com/community/board/300148?search_type=subject_content&search_key=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
    default:
      // if community is unknown(it is unlikely to happen though..), give google link
      return (
        <a
          href={`https://www.google.com/search?q=${fixedWord}`}
          target='_blank'
          className='word-link'
        >
          {fixedWord}
        </a>
      );
  }
};
