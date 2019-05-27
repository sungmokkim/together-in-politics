import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import apiRouter from './api/router/apiRouter';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from '../shared/Routes';
import cors from 'cors';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRouter);

var corsOptions = {
  origin: 'https://www.togetherinpolitics.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.get('*', cors(corsOptions), (req, res) => {
  const store = createStore();

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.fetchDataFromServerSide
        ? route.fetchDataFromServerSide(store).map(action => action)
        : null;
    })
    .reduce((acc, val) => acc.concat(val), [])
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const content = renderer(req, store);

    res.send(content);
  });
});

app.listen(5000, () => {
  console.log('Listening on Port 5000');
});
