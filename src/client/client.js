import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from '../shared/Routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../shared/reducers/reducers';

const initialState = window.__INITIAL_STATE__ || {};
delete window.__INITIAL_STATE__;
const initialStateScript = document.getElementById('initial-state');
initialStateScript.remove();
const store = createStore(reducers, initialState, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(Routes)}</BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
