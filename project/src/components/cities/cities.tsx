import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RoomOffer } from '../../types/room-offer';
import State from '../../types/state';
import RoomCardList from '../room-card-list/room-card-list';
import Map from '../map/map';

const mapStateToProps = ({ offers, activeCity }: State) => ({
  offers, activeCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Cities({ offers, activeCity }: PropsFromRedux): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<RoomOffer | null>(null);

  const offersByCity = offers.filter((offer) => offer.city.name === activeCity);

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
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom">
                <li className="places__option" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <RoomCardList offers={offersByCity} setActiveOffer={setActiveOffer}/>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map points={points} activePoint={activeOffer}/>
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

export { Cities };
export default connector(Cities);
