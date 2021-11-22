import Header from '../header/header';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFavoriteOffersAction } from '../../store/actions/api-actions/api-actions-offers';
import { useEffect } from 'react';
import Spinner from '../spinner/spinner';
import { getFavoriteOffers, getFavoritesFilledStatus, getFavoritesLoadedStatus } from '../../store/reducers/data-reducer/selectors';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFavoriteOffers() {
    return dispatch(fetchFavoriteOffersAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesPage({ fetchFavoriteOffers }: PropsFromRedux): JSX.Element {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const isFavoritesFilled = useSelector(getFavoritesFilledStatus);
  const isFavoritesLoaded = useSelector(getFavoritesLoadedStatus);

  useEffect(() => {
    fetchFavoriteOffers();
  }, [fetchFavoriteOffers]);

  if (!isFavoritesLoaded) {
    return <Spinner/>;
  }

  return (
    <div className="page">
      <Header showNav/>

      {isFavoritesFilled ?
        <FavoritesList favoriteOffers={favoriteOffers}/> : <FavoritesEmpty/>}

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export { FavoritesPage };
export default connector (FavoritesPage);
