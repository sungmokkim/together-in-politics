import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import Routes from '../../shared/Routes';

const renderer = (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>,
  );

  return `
    <!DOCTYPE html>
      <html lang="ko">
      <head>
    
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta
          name="description"
          content="모두의 정치에서는 우리나라 커뮤니티의 여론의 추이를 분석하여 지금까지 제대로 알기 힘들었던 10대에서 40대까지의 생각을 볼 수 있습니다.모두의 정치에서만 볼 수 있는 다양한 지표는 대통령에 대한 호감이나 지지율 그리고 뜨거운 이슈로 떠오른 페미니즘에 대한 여론을 짐작할 수 있게 합니다" />
          <meta property="url" content="https://togetherinpolitics.com" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://togetherinpolitics.com" />
        <meta property="og:title" content="모두의 정치 | 인터넷 커뮤니티 여론은 어떨까?" />
        <meta
          property="og:description"
          content="모두의 정치에서는 우리나라 커뮤니티의 여론의 추이를 분석하여 지금까지 제대로 알기 힘들었던 10대에서 40대까지의 생각을 볼 수 있습니다.모두의 정치에서만 볼 수 있는 다양한 지표는 대통령에 대한 호감이나 지지율 그리고 뜨거운 이슈로 떠오른 페미니즘에 대한 여론을 짐작할 수 있게 합니다"
        />
        <meta property="og:image" content="https://togetherinpolitics.com/img/site.jpg" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

        
          <link rel="stylesheet" href="style.css">
          <link rel="stylesheet" href="calendarStyle.css">
          <link rel="icon" href="favicon.ico" type="image/x-icon">

          <title>모두의 정치</title>

  
      </head>
      <body>
          <div id = "root">
            ${content}
          </div>

          <script id ="initial-state">window.__INITIAL_STATE__ = ${serialize(
    store.getState(),
  )}</script>
  
          <script src = "bundle.js"></script>

      </body>
  </html>
    `;
};

export default renderer;
