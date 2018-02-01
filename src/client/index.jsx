/* eslint-disable react/jsx-closing-tag-location,no-trailing-spaces */
// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import Immutable from 'immutable'

import App from '../shared/app'
import helloReducer from '../shared/reducer/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

/*
const store = createStore(
  combineReducers({ hello: helloReducer }),
  // eslint-disable-next-line no-underscore-dangle
  isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
*/

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable-next-line no-underscore-dangle */

const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

const wrapApp = (AppComponent, reduxStore) =>
  (<Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>)

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)
if (rootEl !== null) {
  ReactDOM.render(wrapApp(App, store), rootEl)

  if (module.hot) {
    // flow-disable-next-line
    module.hot.accept('../shared/app', () => {
      // eslint-disable-next-line global-require
      const NextApp = require('../shared/app').default
      ReactDOM.render(wrapApp(NextApp, store), rootEl)
    })
  }
}

// [at the very end of the file]
setUpSocket(store)
