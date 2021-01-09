import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css"
import {BrowserRouter} from "react-router-dom";
import Root from "./pages";
import {createStore} from "redux";
import RootReducer from "./reducers";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from './store'

const {store, persistor} = configureStore()


ReactDOM.render(
  <BrowserRouter>
      <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
              <Root />
          </PersistGate>
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
