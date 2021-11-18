import { APIRoute } from '../../../const';
import { ThunkActionResult } from '../../../types/action';
import { adaptOffersToClient, getCities } from '../../../utils';
import { setCities, setOffers, setSuggestedOffers } from '../action';

export const fetchOffersList = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(APIRoute.Offers);
    dispatch(setOffers(adaptOffersToClient(data)));
    dispatch(setCities(getCities(data)));
  };

export const fetchSuggestedOffers = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(`${APIRoute.Offers}/${offerId}${APIRoute.SuggestedOffers}`);
    dispatch(setSuggestedOffers(adaptOffersToClient(data)));
  };
