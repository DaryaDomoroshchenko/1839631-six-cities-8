import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { APIRoute, AuthStatus, AUTH_TOKEN_KEY_NAME } from '../../const';
import { makeAuthDataMock, makeCurrentUserMock } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from './api-actions-auth';
import { requireLogout, setAuthStatus, setUserEmail } from '../actions/user-actions';
import { lorem } from 'faker';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const fakeUser = makeCurrentUserMock();

describe('Async auth actions', () => {
  it('should set authorization status to "auth" when server returns 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    await store.dispatch(checkAuthAction());

    expect(store.getActions())
      .toEqual([
        setAuthStatus(AuthStatus.auth),
        setUserEmail(fakeUser.email),
      ]);
  });
  it('should require authorization when POST/login', async () => {
    const store = mockStore();
    const mockAuthData = makeAuthDataMock();
    const token = lorem.word();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token });

    Storage.prototype.setItem = jest.fn();
    await store.dispatch(loginAction(mockAuthData));

    expect(store.getActions())
      .toEqual([
        setAuthStatus(AuthStatus.auth),
        setUserEmail(mockAuthData.login),
      ]);
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, token);
  });
  it('should require logout  when DELETE/logout', async () => {
    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    Storage.prototype.removeItem = jest.fn();
    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogout(),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
