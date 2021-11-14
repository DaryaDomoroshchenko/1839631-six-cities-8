import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/state';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

const mapStateToProps = ({ reviews }: State) => ({
  reviews,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ReviewsList({ reviews }: PropsFromRedux): JSX.Element {
  const renderReviews = reviews.map((review) => (
    <ReviewItem review={review} key={review.id}/>
  ));

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {renderReviews}
      </ul>
      <ReviewForm/>
    </section>
  );
}

export { ReviewsList };
export default connector(ReviewsList);
