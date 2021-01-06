import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css"
import {BrowserRouter} from "react-router-dom";
import Root from "./pages";

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root')
);
