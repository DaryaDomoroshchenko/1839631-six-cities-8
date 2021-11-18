import Header from '../header/header';
import State from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFavoriteOffers } from '../../store/actions/api-actions/api-actions-offers';
import { useEffect } from 'react';
import Spinner from '../spinner/spinner';

const mapStateToProps = ({ favoriteOffers, isFavoritesLoaded }: State) => ({
  favoriteOffers,
  isFavoritesFilled: !!favoriteOffers.length,
  isFavoritesLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getFavOffers() {
    return dispatch(fetchFavoriteOffers());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesPage({ isFavoritesFilled, favoriteOffers, isFavoritesLoaded, getFavOffers }: PropsFromRedux): JSX.Element {
  useEffect(() => {
    getFavOffers();
  }, [getFavOffers]);

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
