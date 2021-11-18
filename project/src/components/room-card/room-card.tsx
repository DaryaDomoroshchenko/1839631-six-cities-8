/* eslint-disable jsx-a11y/img-redundant-alt */
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { changeFavoriteStatus } from '../../store/actions/api-actions/api-actions-offers';
import { ThunkAppDispatch } from '../../types/action';
import { changeFavStatusParams, RoomOffer } from '../../types/room-offer';
import { getClassNames, getRatingValue } from '../../utils';

type RoomCardProps = {
  roomCardType: string;
  offer: RoomOffer;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  changeFavStatus(params: changeFavStatusParams) {
    return dispatch(changeFavoriteStatus(params));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedRoomCardProps = PropsFromRedux & RoomCardProps;

function RoomCard({ roomCardType, offer, onMouseOver, onMouseLeave, changeFavStatus }: ConnectedRoomCardProps): JSX.Element {
  const { id, previewImage, price, rating, title, type, isPremium, isFavorite } = offer;

  const starRatingValue = getRatingValue(rating);

  const handleFavStatusChanging = () => {
    changeFavStatus({
      offerId: id,
      status: isFavorite ? 0 : 1,
    });
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

export { RoomCard };
export default connector (RoomCard);
