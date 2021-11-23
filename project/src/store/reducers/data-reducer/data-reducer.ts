import { createReducer } from '@reduxjs/toolkit';
import { SortingTypes } from '../../../const';
import { dataState } from '../../../types/state';
import { deleteFavOffer, replaceFavOffer, sortReviews } from '../../../utils/common';
import { setFavoriteOffers, setOffers, setReviews, setSortingType, setSuggestedOffers, updateOfferFavStatus } from '../../actions/data-actions';

const initialState: dataState = {
  offers: [],
  suggestedOffers: [],
  favoriteOffers: [],
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  reviews: [],
  sortingType: SortingTypes.popular,
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoaded = true;
    })
    .addCase(setSuggestedOffers, (state, action) => {
      state.suggestedOffers = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
      state.isFavoritesLoaded = true;
    })
    .addCase(updateOfferFavStatus, (state, action) => {
      const offerId = action.payload;
      state.offers = replaceFavOffer(state.offers, offerId);
      state.suggestedOffers = replaceFavOffer(state.suggestedOffers, offerId);
      state.favoriteOffers = deleteFavOffer(state.favoriteOffers, offerId);
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = sortReviews(action.payload);
    })
    .addCase(setSortingType, (state, action) => {
      state.sortingType = action.payload;
    });
});

export default dataReducer;
