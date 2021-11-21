import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import createAPI from './services/api';
import { ThunkAppDispatch } from './types/action';
import { checkAuthAction } from './store/actions/api-actions/api-actions-auth';
import { fetchOffersListAction } from './store/actions/api-actions/api-actions-offers';
import { setAuthStatus } from './store/actions/action';
import { AuthStatus } from './const';
import { Toaster } from 'react-hot-toast';

const api = createAPI(() =>
  store.dispatch(setAuthStatus(AuthStatus.noAuth)),
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersListAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="bottom-center"
        toastOptions={{style: {minWidth: '420px'}}}
      />
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
