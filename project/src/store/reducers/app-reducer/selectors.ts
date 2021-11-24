import { State } from '../../../types/state';
import { CityName } from '../../../const';
import Cities from '../../../types/cities';

export const getActiveCity = (state: State): CityName =>
  state.APP.activeCity;

export const getCities = (state: State): Cities =>
  state.APP.cities;
