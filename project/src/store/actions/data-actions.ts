import { createAction } from '@reduxjs/toolkit';
import { SortingType } from '../../const';
import { ActionType } from '../../types/action';
import { Review } from '../../types/review';
import { RoomOffer } from '../../types/room-offer';

const setOffers = createAction(
  ActionType.SetOffers,
  (offers: RoomOffer[]) => ({
    payload: offers,
  }),
);

const setSuggestedOffers = createAction(
  ActionType.SetSuggestedOffers,
  (suggestedOffers: RoomOffer[]) => ({
    payload: suggestedOffers,
  }),
);

const setFavoriteOffers = createAction(
  ActionType.SetFavoriteOffers,
  (favoriteOffers: RoomOffer[]) => ({
    payload: favoriteOffers,
  }),
);

const updateOfferFavStatus = createAction(
  ActionType.UpdateOfferFavStatus,
  (id: number) => ({
    payload: id,
  }),
);

const setSortingType = createAction(
  ActionType.SetSortingType,
  (sortingType: SortingType) => ({
    payload: sortingType,
  }),
);

const setReviews = createAction(
  ActionType.SetReviews,
  (reviews: Review[]) => ({
    payload: reviews,
  }),
);

export {
  setOffers,
  setSuggestedOffers,
  setFavoriteOffers,
  updateOfferFavStatus,
  setSortingType,
  setReviews
};
