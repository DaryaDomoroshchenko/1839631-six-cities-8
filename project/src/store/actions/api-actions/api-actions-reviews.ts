import { APIRoute } from '../../../const';
import { ThunkActionResult } from '../../../types/action';
import { adaptReviewsToClient } from '../../../utils';
import { setReviews } from '../action';

export const fetchReviews = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(`${APIRoute.Reviews}/${id}`);
    dispatch(setReviews(adaptReviewsToClient(data)));
  };
