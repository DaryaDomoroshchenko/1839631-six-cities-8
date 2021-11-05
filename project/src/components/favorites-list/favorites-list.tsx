
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, CityName } from '../../const';
import { RoomOffer } from '../../types/room-offer';
import State from '../../types/state';
import FavoritesRoomCard from '../favorite-room-card/favorite-room-card';

const mapStateToProps = ({ offers }: State) => ({
  favoriteOffers: offers.filter((offer: RoomOffer) => offer.isFavorite),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesList({ favoriteOffers }: PropsFromRedux): JSX.Element {
  const isCityInFavorites = (city: CityName) => !!favoriteOffers
    .filter((offer: RoomOffer) => offer.city.name === city).length;

  const renderFavoriteOffers = (city: CityName) => favoriteOffers
    .filter((offer: RoomOffer) => offer.city.name === city)
    .map((offer) => (
      <FavoritesRoomCard
        roomOffer={offer}
        key={offer.id}
      />
    ));

  return (
    <ul className="favorites__list">
      {
        Object.values(CityName).map((city) => (
          (isCityInFavorites(city) &&
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
              {renderFavoriteOffers(city)}
            </div>
          </li>)
        ))
      }
    </ul>
  );
}

export { FavoritesList };
export default connector (FavoritesList);
