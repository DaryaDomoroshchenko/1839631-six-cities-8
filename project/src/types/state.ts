import { AuthStatus, CityName, SortingTypes } from '../const';
import Cities from './cities';
import { Review } from './review';
import { RoomOffer } from './room-offer';

type State = {
  authStatus: AuthStatus;
  activeCity: CityName;
  cities: Cities;
  offers: RoomOffer[];
  suggestedOffers: RoomOffer[];
  sortingType: SortingTypes;
  reviews: Review[];
  isOffersLoaded: boolean;
  userEmail: string;
}

export default State;
