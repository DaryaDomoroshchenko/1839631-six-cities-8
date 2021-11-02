import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';
import App from './components/app/app';
import { reviews } from './mocks/reviews';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
