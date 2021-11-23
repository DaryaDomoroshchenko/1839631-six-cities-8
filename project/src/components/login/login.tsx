import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setActiveCity } from '../../store/actions/app-actions';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';
import { getRandomCity } from '../../utils/common';
import Header from '../header/header';
import LoginForm from '../login-form/login-form';

function Login(): JSX.Element {
  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const dispatch = useDispatch();

  const randomCity = getRandomCity();

  const handleCityClick = () => {
    dispatch(setActiveCity(randomCity));
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

export default Login;
