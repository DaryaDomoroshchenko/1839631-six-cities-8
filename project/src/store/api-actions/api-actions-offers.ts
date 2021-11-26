import { APIRoute } from '../../const';
import { ThunkActionResult } from '../../types/action';
import { changeFavStatusParams } from '../../types/room-offer';
import { adaptOffersToClient, getCities } from '../../utils/common';
import toast from 'react-hot-toast';
import { setFavoriteOffers, setOffers, setSuggestedOffers, updateOfferFavStatus } from '../actions/data-actions';
import { setCities } from '../actions/app-actions';

export const fetchOffersListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Offers)
      .then((response) => {
        const data = response.data;
        dispatch(setOffers(adaptOffersToClient(data)));
        dispatch(setCities(getCities(adaptOffersToClient(data))));
      })
      .catch(() => {
        toast.error('Serverside error: offers are not available');
      });
  };

export const fetchSuggestedOffersAction = (offerId: number): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.get(`${APIRoute.Offers}/${offerId}${APIRoute.SuggestedOffers}`)
      .then((response) => {
        const data = response.data;
        dispatch(setSuggestedOffers(adaptOffersToClient(data)));
      })
      .catch(() => {
        toast.error('Serverside error: offers nearby are not available');
      });

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.get(APIRoute.FavoriteOffers)
      .then((response) => {
        const data = response.data;
        dispatch(setFavoriteOffers(adaptOffersToClient(data)));
      })
      .catch(() => {
        toast.error('Serverside error: saved offers are not available');
      });

export const changeFavoriteStatusAction = ({ offerId, status }: changeFavStatusParams): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.post(`${APIRoute.FavoriteOffers}/${offerId}/${status}`)
      .then((response) => {
        const data = response.data;
        dispatch(updateOfferFavStatus(data.id));
      })
      .catch(() => {
        toast.error('Serverside error: failed to save offer');
      });
