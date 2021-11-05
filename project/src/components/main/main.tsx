import Header from '../header/header';
import CityTabs from '../city-tabs/city-tabs';
import OffersByCity from '../offers-by-city/offers-by-city';

function Main(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header showNav/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityTabs/>
        <OffersByCity/>
      </main>
    </div>
  );
}

export default Main;
