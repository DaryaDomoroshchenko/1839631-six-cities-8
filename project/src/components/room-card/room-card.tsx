/* eslint-disable jsx-a11y/img-redundant-alt */
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { changeFavoriteStatusAction } from '../../store/actions/api-actions/api-actions-offers';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';
import { RoomOffer } from '../../types/room-offer';
import { getClassNames, getRatingValue } from '../../utils';

type RoomCardProps = {
  roomCardType: string;
  offer: RoomOffer;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

function RoomCard({ roomCardType, offer, onMouseOver, onMouseLeave }: RoomCardProps): JSX.Element {
  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const dispatch = useDispatch();

  const history = useHistory();

  const { id, previewImage, price, rating, title, type, isPremium, isFavorite } = offer;

  const starRatingValue = getRatingValue(rating);

  const handleFavStatusChanging = () => {
    if (isLoggedIn) {
      dispatch(
        changeFavoriteStatusAction({
          offerId: id,
          status: isFavorite ? 0 : 1,
        }),
      );
    } else {
      history.push(AppRoute.Login);
    }
  };

  return (
    <article
      className={getClassNames([
        'place-card',
        {'cities__place-card': roomCardType === 'mainPage'},
        {'near-places__card': roomCardType === 'roomPage'},
      ])}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {(roomCardType === 'mainPage' && isPremium) &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.RoomPage}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={getClassNames([
              'place-card__bookmark-button',
              {'place-card__bookmark-button--active': isFavorite},
              'button',
            ])}
            type="button"
            onClick={handleFavStatusChanging}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: starRatingValue}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.RoomPage}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default RoomCard;
