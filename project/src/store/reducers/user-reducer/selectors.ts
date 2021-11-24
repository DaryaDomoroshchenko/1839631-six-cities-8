import { State } from '../../../types/state';
import { AuthStatus } from '../../../const';

export const getAuthStatus = (state: State): AuthStatus =>
  state.USER.authStatus;

export const getIsLoggedInStatus = (state: State): boolean =>
  state.USER.authStatus === AuthStatus.auth;

export const getUserEmail = (state: State): string =>
  state.USER.userEmail;
