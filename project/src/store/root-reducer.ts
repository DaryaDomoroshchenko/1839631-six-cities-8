import { combineReducers } from 'redux';
import userReducer from './reducers/user-reducer/user-reducer';
import dataReducer from './reducers/data-reducer/data-reducer';
import appReducer from './reducers/app-reducer/app-reducer';

export enum NameSpace {
  user = 'USER',
  data = 'DATA',
  app = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.user]: userReducer,
  [NameSpace.data]: dataReducer,
  [NameSpace.app]: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
