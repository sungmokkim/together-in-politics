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

var corsOptions = {
  origin: 'https://www.togetherinpolitics.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRouter);

app.get('*', (req, res) => {
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

const server = app.listen(5000, () => {
  console.log('Listening on Port 5000');
});

// wrap socket io in express server
const io = require('socket.io')(server);
io.on('connection', socket => {
  // when user connects, initialize post count to 0
  // this number increases when certain actions occur
  let postCount = 0;

  // when a user writes a new post, broadcast that event (except the user)
  // so that each client can notify that there's a new post written
  socket.on('new-post', () => {
    socket.broadcast.emit('new-post', postCount);
  });

  // when a user fetches post list, it should be up-to-date (because it is from db)
  // so currently accumulated new post count should be 0
  socket.on('clear-post-count', () => {
    socket.emit('clear-post-count', postCount);
  });

  socket.on('open-single-post', currentId => {
    socket.join(currentId);
  });

  socket.on('close-single-post', currentId => {
    socket.leave(currentId);
  });

  socket.on('new-comment', currentId => {
    socket.to(currentId).emit('new-comment');
  });

  socket.on('clear-comment-count', currentId => {
    socket.emit('clear-comment-count', currentId);
  });
});
