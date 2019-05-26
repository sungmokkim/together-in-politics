import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from '../../shared/Routes';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

const renderer = (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  return `
    <!DOCTYPE html>
      <html lang="ko">
      <head>
    
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

          <script src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
          <link rel="stylesheet" href="style.css">
         
          
          <title>모두의 정치</title>

  
      </head>
      <body>
          <div id = "root">
            ${content}
          </div>

          <script id ="initial-state">window.__INITIAL_STATE__ = ${serialize(
            store.getState()
          )}</script>
  
          <script src = "bundle.js"></script>
       
      </body>
  </html>
    `;
};

export default renderer;
