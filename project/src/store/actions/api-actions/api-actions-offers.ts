import { APIRoute } from '../../../const';
import { ThunkActionResult } from '../../../types/action';
import { changeFavStatusParams } from '../../../types/room-offer';
import { adaptOffersToClient, getCities } from '../../../utils';
import { setCities, setFavoriteOffers, setOffers, setSuggestedOffers, updateOfferFavStatus } from '../action';

export const fetchOffersList = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(APIRoute.Offers);
    dispatch(setOffers(adaptOffersToClient(data)));
    dispatch(setCities(getCities(data)));
  };

export const fetchSuggestedOffers = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(`${APIRoute.Offers}/${offerId}${APIRoute.SuggestedOffers}`);
    dispatch(setSuggestedOffers(adaptOffersToClient(data)));
  };

export const fetchFavoriteOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(APIRoute.FavoriteOffers);
    dispatch(setFavoriteOffers(adaptOffersToClient(data)));
  };

export const changeFavoriteStatus = ({ offerId, status }: changeFavStatusParams): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(`${APIRoute.FavoriteOffers}/${offerId}/${status}`);
    dispatch(updateOfferFavStatus(data.id));
  };
