import { connect, ConnectedProps } from 'react-redux';
import { AuthStatus } from '../../const';
import State from '../../types/state';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  offerId: string;
}

const mapStateToProps = ({ reviews, authStatus }: State) => ({
  reviews,
  isLoggedIn: authStatus === AuthStatus.auth,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & ReviewsListProps;

const MAX_REVIEWS_COUNT = 10;

function ReviewsList({ offerId, reviews, isLoggedIn }: ConnectedPrivateRouteProps): JSX.Element {
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

export { ReviewsList };
export default connector(ReviewsList);
