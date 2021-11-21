import { Fragment, memo } from 'react';
import { OfferRatingValues } from '../../const';

type RatingStarProps = {
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  rating: number;
}

function ReviewRating({ handleRatingChange, isPending, rating }: RatingStarProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {
        Object.entries(OfferRatingValues).map(([ratingTitle, ratingValue]) => (
          <Fragment key={ratingValue}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingValue}
              id={`${ratingValue}-stars`}
              type="radio"
              onChange={handleRatingChange}
              disabled={isPending}
              checked={rating === ratingValue}
            />
            <label
              htmlFor={`${ratingValue}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingTitle}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </Fragment>
        ))
      }
    </div>
  );
}

export default memo(ReviewRating);
