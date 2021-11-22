import { NameSpace } from '../../root-reducer';
import { State } from '../../../types/state';
import { AuthStatus } from '../../../const';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.user].authStatus;

export const getIsLoggedInStatus = (state: State): boolean =>
  state[NameSpace.user].authStatus === AuthStatus.auth;

export const getUserEmail = (state: State): string =>
  state[NameSpace.user].userEmail;
