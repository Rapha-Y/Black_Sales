import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './components/Body.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='appBody'>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
