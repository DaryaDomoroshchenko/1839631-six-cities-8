import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapLocation, RoomOffer } from '../../types/room-offer';
import RoomCardList from '../room-card-list/room-card-list';
import Map from '../map/map';
import SortingForm from '../sorting-form/sorting-form';
import { getActiveCity, getCities } from '../../store/reducers/app-reducer/selectors';

type OffersByCityProps = {
  offersByCity: RoomOffer[];
}

function OffersByCity({ offersByCity }: OffersByCityProps): JSX.Element {
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

export default OffersByCity;
