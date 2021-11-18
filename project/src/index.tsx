import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import App from './components/app/app';
import createAPI from './services/api';
import { ThunkAppDispatch } from './types/action';
import { checkAuth } from './store/actions/api-actions/api-actions-auth';
import { fetchOffersList } from './store/actions/api-actions/api-actions-offers';
import { setAuthStatus } from './store/actions/action';
import { AuthStatus } from './const';

const api = createAPI(() =>
  store.dispatch(setAuthStatus(AuthStatus.noAuth)),
);
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuth());
(store.dispatch as ThunkAppDispatch)(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
