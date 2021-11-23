import { NameSpace } from '../../root-reducer';
import { State } from '../../../types/state';
import { CityName } from '../../../const';
import Cities from '../../../types/cities';

export const getActiveCity = (state: State): CityName =>
  state[NameSpace.app].activeCity;

export const getCities = (state: State): Cities =>
  state[NameSpace.app].cities;
