import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { AppRoute, CityName } from '../../const';
import { setActiveCity } from '../../store/action';
import { Actions } from '../../types/action';
import State from '../../types/state';
import { getClassNames } from '../../utils';

const mapStateToProps = ({ activeCity }: State) => ({
  activeCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  handleClickOnActiveCity(activeCity: CityName) {
    dispatch(setActiveCity(activeCity));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CityTabs({ activeCity, handleClickOnActiveCity }: PropsFromRedux): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(CityName).map((city) => (
            <li className="locations__item"  key={city}>
              <a
                className={getClassNames([
                  'locations__item-link',
                  'tabs__item',
                  {'tabs__item--active': city === activeCity},
                ])}
                href={AppRoute.Main}
                onClick={(event) => {
                  event.preventDefault();
                  handleClickOnActiveCity(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { CityTabs };
export default connector (CityTabs);
