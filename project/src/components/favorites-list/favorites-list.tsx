import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, CityName } from '../../const';
import { RoomOffer } from '../../types/room-offer';
import { setActiveCity } from '../../store/actions/app-actions';
import RoomCard from '../room-card/room-card';

type FavoritesListProps = {
  favoriteOffers: RoomOffer[];
}

function FavoritesList({ favoriteOffers }: FavoritesListProps): JSX.Element {
  const dispatch = useDispatch();

  const handleClickOnCity = (city: CityName) => (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setActiveCity(city));
  };

  const citiesWithFavoriteOffers = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  const renderFavoriteOffers = (city: CityName) => favoriteOffers
    .filter((offer: RoomOffer) => offer.city.name === city)
    .map((offer) => (
      <RoomCard
        roomCardType='favoritesPage'
        offer={offer}
        key={offer.id}
      />
    ));

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              citiesWithFavoriteOffers.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link
                        className="locations__item-link"
                        to={AppRoute.Main}
                        onClick={handleClickOnCity(city)}
                        data-testid="city-btn"
                      >
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {renderFavoriteOffers(city)}
                  </div>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesList;
