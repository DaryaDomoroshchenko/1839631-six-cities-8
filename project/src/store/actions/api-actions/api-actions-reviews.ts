import { APIRoute } from '../../../const';
import { ThunkActionResult } from '../../../types/action';
import { sentReview } from '../../../types/review';
import { adaptReviewsToClient } from '../../../utils';
import { setReviews } from '../action';

export const fetchReviews = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(`${APIRoute.Reviews}/${id}`);
    dispatch(setReviews(adaptReviewsToClient(data)));
  };

export const sendComment = ({ id, comment, rating }: sentReview): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(`${APIRoute.Reviews}/${id}`, { comment, rating });
    dispatch(setReviews(adaptReviewsToClient(data)));
  };
