import { APIRoute } from '../../const';
import { ThunkActionResult } from '../../types/action';
import { sentReview } from '../../types/review';
import { adaptReviewsToClient } from '../../utils/common';
import { setReviews } from '../actions/data-actions';
import toast from 'react-hot-toast';

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.get(`${APIRoute.Reviews}/${id}`)
      .then((response) => {
        const data = response.data;
        dispatch(setReviews(adaptReviewsToClient(data)));
      })
      .catch(() => {
        toast.error('Serverside error: reviews are not available');
      });

export const sendCommentAction = ({ id, comment, rating }: sentReview): ThunkActionResult =>
  (dispatch, _getState, api) =>
    api.post(`${APIRoute.Reviews}/${id}`, { comment, rating })
      .then((response) => {
        const data = response.data;
        dispatch(setReviews(adaptReviewsToClient(data)));
      })
      .catch(() => {
        toast.error('Serverside error: failed to add review');
      });
