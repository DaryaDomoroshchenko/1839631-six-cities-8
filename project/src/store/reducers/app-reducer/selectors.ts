import { NameSpace } from '../../root-reducer';
import { State } from '../../../types/state';
import { CityName, SortingTypes } from '../../../const';
import Cities from '../../../types/cities';

export const getActiveCity = (state: State): CityName =>
  state[NameSpace.app].activeCity;

export const getCities = (state: State): Cities =>
  state[NameSpace.app].cities;

export const getSortingType = (state: State): SortingTypes =>
  state[NameSpace.app].sortingType;
