import { connect, ConnectedProps } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AppRoute, AuthStatus, CityName } from '../../const';
import { setActiveCity } from '../../store/actions/action';
import { ThunkAppDispatch } from '../../types/action';
import State from '../../types/state';
import { getRandomCity } from '../../utils';
import Header from '../header/header';
import LoginForm from '../login-form/login-form';

const mapStateToProps = ({ authStatus }: State) => ({
  isLoggedIn: authStatus === AuthStatus.auth,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setRandomCity(activeCity: CityName) {
    return dispatch(setActiveCity(activeCity));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Login({ isLoggedIn, setRandomCity }: PropsFromRedux): JSX.Element {
  const randomCity = getRandomCity();

  const handleCityClick = () => {
    setRandomCity(randomCity);
  };

  if (isLoggedIn) {
    return (<Redirect to={AppRoute.Main}/>);
  }

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { Login };
export default connector (Login);
