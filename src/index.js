import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './signin'
import reportWebVitals from './reportWebVitals';
import HideAppBar from './header';
import DashBoard from './dashboard';
import ThreeD from './threeD'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

ReactDOM.render(
  <>
  <HideAppBar></HideAppBar>
  <SignIn></SignIn>
  <BrowserRouter>
  <React.StrictMode>
    
     <Route path="/entered"><DashBoard></DashBoard> <ThreeD></ThreeD></Route>
    
  </React.StrictMode>
  </BrowserRouter></>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
