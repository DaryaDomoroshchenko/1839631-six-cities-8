import Header from '../header/header';
import { useDispatch, useSelector } from 'react-redux';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';
import { fetchFavoriteOffersAction } from '../../store/api-actions/api-actions-offers';
import { useEffect } from 'react';
import Spinner from '../spinner/spinner';
import { getFavoriteOffers, getFavoritesFilledStatus, getFavoritesLoadedStatus } from '../../store/reducers/data-reducer/selectors';
import Footer from '../footer/footer';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const isFavoritesFilled = useSelector(getFavoritesFilledStatus);
  const isFavoritesLoaded = useSelector(getFavoritesLoadedStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (!isFavoritesLoaded) {
    return <Spinner/>;
  }

  return (
    <div className="page">
      <Header showNav/>

      {isFavoritesFilled ?
        <FavoritesList favoriteOffers={favoriteOffers}/> : <FavoritesEmpty/>}

      <Footer/>
    </div>
  );
}

export default FavoritesPage;
