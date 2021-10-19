/* eslint-disable jsx-a11y/img-redundant-alt */
import { useParams } from 'react-router-dom';
import Header from '../header/header';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import RoomCard from '../room-card/room-card';
import Error404 from '../error-404/error-404';
import { AuthorizationStatus } from '../../const';
import { RoomOffer } from '../../types/room-offer';
import { Review } from '../../types/review';
import { getRandomId, getRatingValue, getClassNames } from '../../utils';

type RoomPageProps = {
  authorizationStatus: AuthorizationStatus;
  roomOffers: RoomOffer[];
  reviews: Review[];
}

function RoomPage({ authorizationStatus, roomOffers, reviews }: RoomPageProps): JSX.Element {
  const MAX_IMAGES_COUNT = 6;
  const MAX_SUGGESTED_ROOMS_COUNT = 3;

  const { id } = useParams<{id: string}>();
  const currentOffer = roomOffers.find((offer: RoomOffer) => offer.id === +id);

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
    host,
    description,
    isPremium,
    isFavorite,
  } = currentOffer;

  const starRatingValue = getRatingValue(rating);

  return (
    <div className="page">
      <Header showNav authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                imageUrls.slice(0, MAX_IMAGES_COUNT).map((image) => (
                  <div className="property__image-wrapper" key={getRandomId()}>
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                ))
              }
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
                  {goods.map((good) => (
                    <li className="property__inside-item" key={getRandomId()}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={getClassNames([
                      'property__avatar-wrapper',
                      {'property__avatar-wrapper--pro': host.isPro},
                      'user__avatar-wrapper',
                    ])}
                  >
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro &&
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
                  {
                    reviews.map((review) => (
                      <ReviewItem review={review} key={review.id}/>
                    ))
                  }
                </ul>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        {roomOffers.length &&
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                roomOffers.slice(0, MAX_SUGGESTED_ROOMS_COUNT).map((roomOffer) => (
                  <RoomCard
                    roomOffer={roomOffer}
                    key={roomOffer.id}
                  />
                ))
              }
            </div>
          </section>
        </div>}
      </main>
    </div>
  );
}

export default RoomPage;
