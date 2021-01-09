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

const store = createStore(RootReducer, composeWithDevTools()); // 스토어를 만듭니다.
console.log(store.getState())

ReactDOM.render(
  <BrowserRouter>
      <Provider store={store} >
        <Root />
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
