import { CityName } from '../const';
import Cities from './cities';
import { RoomOffer } from './room-offer';

type State = {
  activeCity: CityName;
  offers: RoomOffer[];
  cities: Cities,
}

export default State;
