import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'reflect-metadata';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const experimentalGroup = 'jugglechat';
const completionCode = '29FF9E09';

ReactDOM.render(
  <BrowserRouter>
      <App experimentalGroup={experimentalGroup} completionCode={completionCode} />
  </BrowserRouter>, 
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();