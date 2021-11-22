import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, CityName, SortingTypes } from '../../const';
import { setActiveCity, setSortingType } from '../../store/actions/action';
import { getActiveCity } from '../../store/reducers/app-reducer/selectors';
import { getClassNames } from '../../utils';

function CityTabs(): JSX.Element {
  const activeCity = useSelector(getActiveCity);
  const dispatch = useDispatch();

  const handleClickOnTab = (city: CityName) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setActiveCity(city));
    dispatch(setSortingType(SortingTypes.popular));
  };

  const renderCityTabs = Object.values(CityName).map((city) => (
    <li className="locations__item" key={city}>
      <a
        className={getClassNames([
          'locations__item-link',
          'tabs__item',
          {'tabs__item--active': city === activeCity},
        ])}
        href={AppRoute.Main}
        onClick={handleClickOnTab(city)}
      >
        <span>{city}</span>
      </a>
    </li>
  ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {renderCityTabs}
        </ul>
      </section>
    </div>
  );
}

export default CityTabs;
