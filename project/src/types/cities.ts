import { CityName } from '../const';
import { MapLocation } from './room-offer';

type Cities = {
  [key in CityName]?: MapLocation;
}

export default Cities;
