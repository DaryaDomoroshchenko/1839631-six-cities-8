import Header from '../header/header';
import CityTabs from '../city-tabs/city-tabs';
import OffersByCity from '../offers-by-city/offers-by-city';
import { useSelector } from 'react-redux';
import { getOffersByCity } from '../../store/reducers/data-reducer/selectors';
import OffersEmpty from '../offers-empty/offers-empty';

function Main(): JSX.Element {
  const offersByCity = useSelector(getOffersByCity);

  const isAvailableOffers = !!offersByCity.length;

  return (
    <div className="page page--gray page--main">
      <Header showNav/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityTabs/>

        {isAvailableOffers ?
          <OffersByCity offersByCity={offersByCity}/> : <OffersEmpty/>}
      </main>
    </div>
  );
}

export default Main;
