import { SortingTypes } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { dataState } from '../../../types/state';
import { deleteFavOffer, replaceFavOffer, sortReviews } from '../../../utils';

const initialState: dataState = {
  offers: [],
  suggestedOffers: [],
  favoriteOffers: [],
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  reviews: [],
  sortingType: SortingTypes.popular,
};

const dataReducer = (state = initialState, action: Actions): dataState => {
  switch (action.type) {
    case ActionType.SetOffers:
      return { ...state, offers: action.payload, isOffersLoaded: true};

    case ActionType.SetSuggestedOffers:
      return { ...state, suggestedOffers: action.payload};

    case ActionType.SetFavoriteOffers:
      return { ...state, favoriteOffers: action.payload, isFavoritesLoaded: true};

    case ActionType.UpdateOfferFavStatus:
      return {
        ...state,
        offers: replaceFavOffer(state.offers, action.payload),
        suggestedOffers: replaceFavOffer(state.suggestedOffers, action.payload),
        favoriteOffers: deleteFavOffer(state.favoriteOffers, action.payload),
      };

    case ActionType.SetReviews:
      return { ...state, reviews: sortReviews(action.payload)};

    case ActionType.SetSortingType:
      return { ...state, sortingType: action.payload};

    default:
      return state;
  }
};

export default dataReducer;
