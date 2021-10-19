import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { roomOffers } from './mocks/room-offers';
import { reviews } from './mocks/reviews';

ReactDOM.render(
  <React.StrictMode>
    <App roomOffers={roomOffers} reviews={reviews}/>
  </React.StrictMode>,
  document.getElementById('root'));
