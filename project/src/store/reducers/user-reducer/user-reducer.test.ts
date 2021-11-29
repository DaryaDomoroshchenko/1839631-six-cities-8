import { AuthStatus } from '../../../const';
import { requireLogout, setAuthStatus, setUserEmail } from '../../actions/user-actions';
import userReducer from './user-reducer';

const initialState = {
  authStatus: AuthStatus.Unknown,
  userEmail: '',
};

describe('Reducer: userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should set authorization status to "auth"', () => {
    expect(userReducer(initialState, setAuthStatus(AuthStatus.Auth)))
      .toEqual({
        ...initialState,
        authStatus: AuthStatus.Auth,
      });
  });
  it('should set authorization status to "noAuth"', () => {
    expect(userReducer(initialState, setAuthStatus(AuthStatus.NoAuth)))
      .toEqual({
        ...initialState,
        authStatus: AuthStatus.NoAuth,
      });
  });
  it('should set authorization status to "noAuth" if user requires logout', () => {
    expect(userReducer(initialState, requireLogout()))
      .toEqual({
        ...initialState,
        authStatus: AuthStatus.NoAuth,
      });
  });
  it('should set user`s email', () => {
    const userEmail = 'email';
    expect(userReducer(initialState, setUserEmail(userEmail)))
      .toEqual({
        ...initialState,
        userEmail,
      });
  });
});
