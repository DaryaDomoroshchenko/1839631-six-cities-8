import { userState } from '../../../types/state';
import { AuthStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { requireLogout, setAuthStatus, setUserEmail } from '../../actions/user-actions';

const initialState: userState = {
  authStatus: AuthStatus.Unknown,
  userEmail: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authStatus = AuthStatus.NoAuth;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    });
});

export default userReducer;
