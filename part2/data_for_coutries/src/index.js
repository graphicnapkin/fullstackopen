import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
require('dotenv').config();

// ReactDOM.render(
//   <React.StrictMode>
//     <Weather name=""capitol="Singapore"/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

