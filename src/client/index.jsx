// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

// ReactDOM.render(<App />, (document.querySelector(APP_CONTAINER_SELECTOR): any))

const appTag = document.querySelector(APP_CONTAINER_SELECTOR)
if (appTag !== null) {
  ReactDOM.render(<App />, appTag)
}
