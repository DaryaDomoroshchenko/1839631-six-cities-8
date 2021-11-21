import { Actions, ActionType } from '../../../types/action';
import { userState } from '../../../types/state';
import { AuthStatus } from '../../../const';

const initialState: userState = {
  authStatus: AuthStatus.unknown,
  userEmail: '',
};

const userReducer = (state = initialState, action: Actions): userState => {
  switch (action.type) {
    case ActionType.SetAuthStatus:
      return { ...state, authStatus: action.payload};

    case ActionType.RequireLogout:
      return { ...state, authStatus: AuthStatus.noAuth};

    case ActionType.SetUserEmail:
      return { ...state, userEmail: action.payload};

    default:
      return state;
  }
};

export default userReducer;
