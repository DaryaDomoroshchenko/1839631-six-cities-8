import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';
import { ActionType } from '../../types/action';

const setAuthStatus = createAction(
  ActionType.SetAuthStatus,
  (authStatus: AuthStatus) => ({
    payload: authStatus,
  }),
);

const requireLogout = createAction(
  ActionType.RequireLogout,
);


const setUserEmail = createAction(
  ActionType.SetUserEmail,
  (userEmail: string) => ({
    payload: userEmail,
  }),
);

export {
  setAuthStatus,
  requireLogout,
  setUserEmail
};
