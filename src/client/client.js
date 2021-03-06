import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Routes from '../shared/Routes';
import reducers from '../shared/reducers/reducers';
import { initGA } from '../shared/googleAnalytics';

import './clientStyle.scss';

/* eslint-disable no-underscore-dangle */
const initialState = window.__INITIAL_STATE__ || {};
delete window.__INITIAL_STATE__;
const initialStateScript = document.getElementById('initial-state');
initialStateScript.remove();
const store = createStore(reducers, initialState, applyMiddleware(thunk));

initGA(); // initialize GA for the first time only

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(Routes)}</BrowserRouter>
  </Provider>,

  document.getElementById('root'),
);
