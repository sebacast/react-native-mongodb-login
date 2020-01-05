/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import AppNav from "./componentes/AppNav";
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import Reducers from './reducers';
let store = createStore(Reducers)


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNav />
      </Provider>
    );
  }
};


