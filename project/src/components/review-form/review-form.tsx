import { useState, ChangeEvent, FormEvent, useCallback  } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import { sendCommentAction } from '../../store/actions/api-actions/api-actions-reviews';
import ReviewRating from '../review-rating/review-rating';
import ReviewTextarea from '../review-textarea/review-textarea';

type ReviewFormProps = {
  offerId: number;
}

const REVIEW_MIN_LENGTH = 50;

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isPending, setIsPending] = useState(false);

  const isFormNotCompleted = !+rating || review.length < REVIEW_MIN_LENGTH;

  const handleRatingChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setRating(+event.target.value),
    [],
  );
  const handleReviewAdding = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setReview(event.target.value),
    [],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (review && rating) {
      setIsPending(true);
      dispatch(
        sendCommentAction({
          id: offerId,
          comment: review,
          rating: rating,
        }),
      )
        .then(() => {
          setRating(0);
          setReview('');
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <ReviewRating handleRatingChange={handleRatingChange} isPending={isPending} rating={rating}/>

      <ReviewTextarea handleReviewAdding={handleReviewAdding} isPending={isPending} review={review}/>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isFormNotCompleted || isPending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
