import { useState, ChangeEvent, FormEvent  } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { sendCommentAction } from '../../store/actions/api-actions/api-actions-reviews';
import { ThunkAppDispatch } from '../../types/action';
import { sentReview } from '../../types/review';

type ReviewFormProps = {
  offerId: string;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  sendComment(reviewObj: sentReview) {
    return dispatch(sendCommentAction(reviewObj));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & ReviewFormProps;

const REVIEW_MIN_LENGTH = 50;

function ReviewForm({ offerId, sendComment }: ConnectedPrivateRouteProps): JSX.Element {
  const [rating, setRating] = useState('0');
  const [review, setReview] = useState('');
  const [isPending, setIsPending] = useState(false);

  const isFormNotCompleted = !+rating || review.length < REVIEW_MIN_LENGTH;

  const changeRating = (event: ChangeEvent<HTMLInputElement>) => setRating(event.target.value);
  const addReview = (event: ChangeEvent<HTMLTextAreaElement>) => setReview(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (review && rating) {
      setIsPending(true);
      sendComment({
        id: +offerId,
        comment: review,
        rating: +rating,
      })
        .then(() => {
          setRating('0');
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

      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={changeRating}
          disabled={isPending}
          checked={rating === '5'}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={changeRating}
          disabled={isPending}
          checked={rating === '4'}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={changeRating}
          disabled={isPending}
          checked={rating === '3'}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={changeRating}
          disabled={isPending}
          checked={rating === '2'}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={changeRating}
          disabled={isPending}
          checked={rating === '1'}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={addReview}
        disabled={isPending}
      >
      </textarea>

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

export { ReviewForm };
export default connector (ReviewForm);
