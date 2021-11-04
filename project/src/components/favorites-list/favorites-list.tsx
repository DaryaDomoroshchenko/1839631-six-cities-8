
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { RoomOffer } from '../../types/room-offer';
import State from '../../types/state';
import FavoritesRoomCard from '../favorite-room-card/favorite-room-card';

type OfferGroups = {
  [name: string]: RoomOffer[];
}

const mapStateToProps = ({ offers }: State) => ({
  favoriteOffers: offers.filter((offer: RoomOffer) => offer.isFavorite),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const groupOffers = (offers: RoomOffer[]): OfferGroups => offers
  .reduce((acc: OfferGroups, offer: RoomOffer) => {
    const { name } = offer.city;

    if (!acc[name]) {
      acc[name] = [];
    }

    acc[name].push(offer);

    return acc;
  }, {});

function FavoritesList({ favoriteOffers }: PropsFromRedux): JSX.Element {
  const offersByCities = groupOffers(favoriteOffers);

  return (
    <ul className="favorites__list">
      {Object.entries(offersByCities).map(([city, offersByCity]) => (
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
            {offersByCity.map((offer) => (
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

export { FavoritesList };
export default connector (FavoritesList);
