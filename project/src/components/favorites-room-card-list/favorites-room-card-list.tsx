
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { RoomOffer } from '../../types/room-offer';
import FavoritesRoomCard from '../favorite-room-card/favorite-room-card';

type FavoritesRoomCardListProps = {
  roomOffers: RoomOffer[];
}

type OfferGroups = {
  [name: string]: RoomOffer[];
}

const groupFavoriteOffers = (offers: RoomOffer[]): OfferGroups => offers
  .filter((offer: RoomOffer) => offer.isFavorite)
  .reduce((acc: OfferGroups, offer: RoomOffer) => {
    const { name } = offer.city;

    if (!acc[name]) {
      acc[name] = [];
    }

    acc[name].push(offer);

    return acc;
  }, {});

function FavoritesRoomCardList({ roomOffers }: FavoritesRoomCardListProps): JSX.Element {
  const offersByCities = groupFavoriteOffers(roomOffers);

  return (
    <ul className="favorites__list">
      {Object.entries(offersByCities).map(([city, offers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
              >
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              <FavoritesRoomCard
                roomOffer={offer}
                key={offer.id}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesRoomCardList;
