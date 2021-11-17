import { ThunkActionResult } from '../../../types/action';
import { setAuthStatus, requireLogout } from '../action';
import { APIRoute, AuthStatus } from '../../../const';
import { deleteToken, saveToken, Token } from '../../../services/token';
import AuthData from '../../../types/auth-data';

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(setAuthStatus(AuthStatus.auth));
      });
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(setAuthStatus(AuthStatus.auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    deleteToken();
    dispatch(requireLogout());
  };
