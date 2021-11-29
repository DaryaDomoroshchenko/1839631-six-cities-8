import { ThunkActionResult } from '../../types/action';
import { APIRoute, AuthStatus } from '../../const';
import { deleteToken, saveToken, Token } from '../../services/token';
import { AuthData } from '../../types/auth-data';
import toast from 'react-hot-toast';
import { requireLogout, setAuthStatus, setUserEmail } from '../actions/user-actions';

export const checkAuthAction = (): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.get(APIRoute.Login)
      .then((response) => {
        const email = response.data.email;
        dispatch(setAuthStatus(AuthStatus.Auth));
        dispatch(setUserEmail(email));
      });

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.post<{ token: Token }>(APIRoute.Login, { email, password })
      .then((response) => {
        const token = response.data.token;
        saveToken(token);
        dispatch(setAuthStatus(AuthStatus.Auth));
        dispatch(setUserEmail(email));
      })
      .catch(() => {
        toast.error('Serverside error: failed to log in');
      });

export const logoutAction = (): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.delete(APIRoute.Logout)
      .then(() => {
        deleteToken();
        dispatch(requireLogout());
      })
      .catch(() => {
        toast.error('Serverside error: failed to log out');
      });
