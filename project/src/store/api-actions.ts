import { ThunkActionResult } from '../types/action';
import { setOffers } from './action';
import { adaptOffersToClient } from '../utils';

export const fetchOffersList = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/hotels');
    dispatch(setOffers(adaptOffersToClient(data)));
  };
