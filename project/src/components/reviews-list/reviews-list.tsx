import { useSelector } from 'react-redux';
import { getReviews } from '../../store/reducers/data-reducer/selectors';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  offerId: number;
}

const MAX_REVIEWS_COUNT = 10;

function ReviewsList({ offerId }: ReviewsListProps): JSX.Element {
  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const reviews = useSelector(getReviews);

  const renderReviews = reviews && reviews.slice(0, MAX_REVIEWS_COUNT).map((review) => (
    <ReviewItem review={review} key={review.id}/>
  ));

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {renderReviews}
      </ul>
      {isLoggedIn && <ReviewForm offerId={offerId}/>}
    </section>
  );
}

export default ReviewsList;
