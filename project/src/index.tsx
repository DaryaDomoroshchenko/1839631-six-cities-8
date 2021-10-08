import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  ROOM_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App roomCount={Setting.ROOM_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
