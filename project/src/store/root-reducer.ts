import { combineReducers } from 'redux';
import userReducer from './reducers/user-reducer/user-reducer';
import dataReducer from './reducers/data-reducer/data-reducer';
import appReducer from './reducers/app-reducer/app-reducer';

export const rootReducer = combineReducers({
  USER: userReducer,
  DATA: dataReducer,
  APP: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
