import { AuthStatus } from '../../../const';
import { requireLogout, setAuthStatus, setUserEmail } from '../../actions/user-actions';
import userReducer from './user-reducer';

const initialState = {
  authStatus: AuthStatus.unknown,
  userEmail: '',
};

describe('Reducer: userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(void 0, {type: 'unknownAction'}))
      .toEqual(initialState);
  });
  it('should set authorization status to "auth"', () => {
    expect(userReducer(initialState, setAuthStatus(AuthStatus.auth)))
      .toEqual({
        ...initialState,
        authStatus: AuthStatus.auth,
      });
  });
  it('should set authorization status to "noAuth"', () => {
    expect(userReducer(initialState, setAuthStatus(AuthStatus.noAuth)))
      .toEqual({
        ...initialState,
        authStatus: AuthStatus.noAuth,
      });
  });
  it('should set authorization status to "noAuth" if user requires logout', () => {
    expect(userReducer(initialState, requireLogout()))
      .toEqual({
        ...initialState,
        authStatus: AuthStatus.noAuth,
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
