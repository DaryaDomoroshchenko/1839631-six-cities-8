import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import createAPI from './services/api';
import { ThunkAppDispatch } from './types/action';
import { checkAuthAction } from './store/api-actions/api-actions-auth';
import { fetchOffersListAction } from './store/api-actions/api-actions-offers';
import { setAuthStatus } from './store/actions/user-actions';
import { AuthStatus } from './const';
import { Toaster } from 'react-hot-toast';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

const api = createAPI(() =>
  store.dispatch(setAuthStatus(AuthStatus.noAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api },
    }),
});

export type AppDispatch = typeof store.dispatch;

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersListAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="bottom-center"
          toastOptions={{style: {minWidth: '420px'}}}
        />
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
