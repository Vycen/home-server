import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {URL} from './constants';

import registerServiceWorker from './registerServiceWorker';

import asyncDispatchMiddleware from './middleware';
import AppStore from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io(URL.server);

let socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER/");

let store = createStore(AppStore, applyMiddleware(asyncDispatchMiddleware, socketIoMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
