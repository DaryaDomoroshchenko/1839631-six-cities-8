import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { AppRoute, CityName, SortingTypes } from '../../const';
import { setActiveCity, setSortingType } from '../../store/actions/action';
import { getActiveCity } from '../../store/reducers/app-reducer/selectors';
import { Actions } from '../../types/action';
import { State } from '../../types/state';
import { getClassNames } from '../../utils';

const mapStateToProps = (state: State) => ({
  activeCity: getActiveCity(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  handleClickOnActiveCity(activeCity: CityName) {
    dispatch(setActiveCity(activeCity));
    dispatch(setSortingType(SortingTypes.popular));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CityTabs({ activeCity, handleClickOnActiveCity }: PropsFromRedux): JSX.Element {
  const handleClick = (city: CityName) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClickOnActiveCity(city);
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
        onClick={handleClick(city)}
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

export { CityTabs };
export default connector (CityTabs);
