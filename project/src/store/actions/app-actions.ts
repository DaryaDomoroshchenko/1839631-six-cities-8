import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../../const';
import { ActionType } from '../../types/action';
import Cities from '../../types/cities';

const setActiveCity = createAction(
  ActionType.SetActiveCity,
  (activeCity: CityName) => ({
    payload: activeCity,
  }),
);

const setCities = createAction(
  ActionType.SetCities,
  (cities: Cities) => ({
    payload: cities,
  }),
);

export {
  setActiveCity,
  setCities
};
