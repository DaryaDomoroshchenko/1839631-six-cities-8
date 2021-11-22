/* eslint-disable jsx-a11y/img-redundant-alt */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { changeFavoriteStatusAction } from '../../store/actions/api-actions/api-actions-offers';
import { RoomOffer } from '../../types/room-offer';
import { getClassNames, getRatingValue } from '../../utils';

type FavoriteRoomCardProps = {
  roomOffer: RoomOffer;
}

function FavoritesRoomCard({ roomOffer }: FavoriteRoomCardProps): JSX.Element {
  const dispatch = useDispatch();

  const { id, previewImage, price, title, rating, type, isFavorite } = roomOffer;

  const starRatingValue = getRatingValue(rating);

  const handleFavStatusChanging = () => {
    dispatch(
      changeFavoriteStatusAction({
        offerId: id,
        status: isFavorite ? 0 : 1,
      }),
    );
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.RoomPage}/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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
            <span className="visually-hidden">In bookmarks</span>
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

export default FavoritesRoomCard;
