/* eslint-disable jsx-a11y/img-redundant-alt */
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import Error404 from '../error-404/error-404';
import { RoomOffer } from '../../types/room-offer';
import { getRandomId, getRatingValue, getClassNames, scrollToTop } from '../../utils/common';
import RoomCardList from '../room-card-list/room-card-list';
import { useEffect } from 'react';
import { changeFavoriteStatusAction, fetchSuggestedOffersAction } from '../../store/api-actions/api-actions-offers';
import { fetchReviewsAction } from '../../store/api-actions/api-actions-reviews';
import { AppRoute } from '../../const';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';
import { getOffers, getSuggestedOffers } from '../../store/reducers/data-reducer/selectors';
import { useSelector } from 'react-redux';

const MAX_IMAGES_COUNT = 6;

function RoomPage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const offers = useSelector(getOffers);
  const suggestedOffers = useSelector(getSuggestedOffers);

  const { offerId: paramsId } = useParams<{offerId: string}>();
  const offerId = +paramsId;
  const currentOffer = offers.find((offer: RoomOffer) => offer.id === offerId);
  const currentOfferLocation = currentOffer ? currentOffer.location : null;

  useEffect(() => {
    dispatch(fetchReviewsAction(offerId));
    dispatch(fetchSuggestedOffersAction(offerId));

    scrollToTop();
  }, [dispatch, offerId]);

  if (currentOffer === undefined) {
    return <Error404/>;
  }

  const {
    images,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host: { avatarUrl, isPro, name },
    description,
    isPremium,
    isFavorite,
  } = currentOffer;

  const starRatingValue = getRatingValue(rating);

  const renderImages = images.slice(0, MAX_IMAGES_COUNT).map((image) => (
    <div className="property__image-wrapper" key={getRandomId()}>
      <img className="property__image" src={image} alt="Photo studio" />
    </div>
  ));

  const renderGoods = goods.map((good) => (
    <li className="property__inside-item" key={getRandomId()}>
      {good}
    </li>
  ));

  const offersOnMap = [...suggestedOffers, currentOffer];

  const points = offersOnMap.map((offer) => {
    const { id, location: { latitude, longitude } } = offer;
    return { id, latitude, longitude };
  });

  const handleFavStatusChanging = () => {
    if (isLoggedIn) {
      dispatch(
        changeFavoriteStatusAction({
          offerId,
          status: isFavorite ? 0 : 1,
        }),
      );
    } else {
      history.push(AppRoute.Login);
    }
  };

  return (
    <div className="page">
      <Header showNav/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {renderImages}
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
                  onClick={handleFavStatusChanging}
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
                  {renderGoods}
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
              <ReviewsList offerId={offerId}/>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={points}
              activePointId={currentOffer.id}
              mapCenterPoint={currentOfferLocation}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <RoomCardList
              roomCardType='roomPage'
              offers={suggestedOffers}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
