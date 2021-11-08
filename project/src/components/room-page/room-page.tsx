/* eslint-disable jsx-a11y/img-redundant-alt */
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../header/header';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import RoomCard from '../room-card/room-card';
import Error404 from '../error-404/error-404';
import { RoomOffer } from '../../types/room-offer';
import State from '../../types/state';
import { getRandomId, getRatingValue, getClassNames } from '../../utils';

const mapStateToProps = ({ offers, reviews }: State) => ({
  offers, reviews,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const MAX_IMAGES_COUNT = 6;
const MAX_SUGGESTED_ROOMS_COUNT = 3;

function RoomPage({ reviews, offers }: PropsFromRedux): JSX.Element {
  const { id } = useParams<{id: string}>();
  const currentOffer = offers.find((offer: RoomOffer) => offer.id === +id);

  if (currentOffer === undefined) {
    return <Error404/>;
  }

  const {
    imageUrls,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host: {avatarUrl, isPro, name},
    description,
    isPremium,
    isFavorite,
  } = currentOffer;

  const starRatingValue = getRatingValue(rating);

  const setImages = imageUrls.slice(0, MAX_IMAGES_COUNT).map((image) => (
    <div className="property__image-wrapper" key={getRandomId()}>
      <img className="property__image" src={image} alt="Photo studio" />
    </div>
  ));

  const setGoods = goods.map((good) => (
    <li className="property__inside-item" key={getRandomId()}>
      {good}
    </li>
  ));

  const setReviews = reviews.map((review) => (
    <ReviewItem review={review} key={review.id}/>
  ));

  const setSuggestedOffers = offers
    .slice(0, MAX_SUGGESTED_ROOMS_COUNT)
    .map((offer) => (
      <RoomCard
        offer={offer}
        key={offer.id}
      />
    ));

  return (
    <div className="page">
      <Header showNav/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {setImages}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={getClassNames([
                    'property__bookmark-button',
                    {'property__bookmark-button--active': isFavorite},
                    'button',
                  ])}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: starRatingValue}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {setGoods}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={getClassNames([
                      'property__avatar-wrapper',
                      {'property__avatar-wrapper--pro': isPro},
                      'user__avatar-wrapper',
                    ])}
                  >
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">{name}</span>
                  {isPro &&
                    <span className="property__user-status">
                    Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {setReviews}
                </ul>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        {offers.length &&
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {setSuggestedOffers}
            </div>
          </section>
        </div>}
      </main>
    </div>
  );
}

export { RoomPage };
export default connector(RoomPage);
