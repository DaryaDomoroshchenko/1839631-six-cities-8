import { createReducer } from '@reduxjs/toolkit';
import { CityName } from '../../../const';
import { appState } from '../../../types/state';
import { setActiveCity, setCities } from '../../actions/app-actions';

const initialState: appState = {
  activeCity: CityName.Paris,
  cities: {},
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setCities, (state, action) => {
      state.cities = action.payload;
    });
});

export default appReducer;
