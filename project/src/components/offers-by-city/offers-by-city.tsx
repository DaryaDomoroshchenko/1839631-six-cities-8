import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapLocation, RoomOffer } from '../../types/room-offer';
import RoomCardList from '../room-card-list/room-card-list';
import Map from '../map/map';
import SortingForm from '../sorting-form/sorting-form';
import { getActiveCity, getCities } from '../../store/reducers/app-reducer/selectors';
import { getOffersByCity } from '../../store/reducers/data-reducer/selectors';

function OffersByCity(): JSX.Element {
  const offersByCity = useSelector(getOffersByCity);
  const activeCity = useSelector(getActiveCity);
  const cities = useSelector(getCities);

  const [activeOffer, setActiveOffer] = useState<RoomOffer | null>(null);
  const activePointId = activeOffer ? activeOffer.id : null;
  const [cityLocation, setCityLocation] = useState<MapLocation | null>(null);

  useEffect(() => {
    if (cities[activeCity]) {
      setCityLocation(cities[activeCity]);
    }
  }, [cities, activeCity]);

  const points = offersByCity.map((offer) => {
    const { id, location: { latitude, longitude } } = offer;
    return { id, latitude, longitude };
  });

  const hasAvailableeOffers = !!offersByCity.length;

  if (hasAvailableeOffers) {
    return (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersByCity.length} places to stay in {activeCity}</b>
            <SortingForm/>
            <RoomCardList
              roomCardType='mainPage'
              offers={offersByCity}
              setActiveOffer={setActiveOffer}
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                points={points}
                activePointId={activePointId}
                mapCenterPoint={cityLocation}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default OffersByCity;
