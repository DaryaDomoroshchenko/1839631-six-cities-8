import { FormEvent, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { AppRoute, AuthStatus, CityName } from '../../const';
import { setActiveCity } from '../../store/actions/action';
import { loginAction } from '../../store/actions/api-actions/api-actions-auth';
import { ThunkAppDispatch } from '../../types/action';
import AuthData from '../../types/auth-data';
import State from '../../types/state';
import { getRandomCity } from '../../utils';
import Header from '../header/header';

const mapStateToProps = ({ authStatus }: State) => ({
  isLoggedIn: authStatus === AuthStatus.auth,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    return dispatch(loginAction(authData));
  },
  setRandomCity(activeCity: CityName) {
    return dispatch(setActiveCity(activeCity));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Login({ isLoggedIn, onSubmit, setRandomCity }: PropsFromRedux): JSX.Element {
  const history = useHistory();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })
        .then(() => {
          history.push(AppRoute.Main);
        });
    }
  };

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
            <form
              className="login__form form"
              action="#"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
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
