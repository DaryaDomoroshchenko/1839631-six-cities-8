import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';
import { getClassNames } from '../../utils/common';
import UserBlockAuthorized from '../user-block-authorized/user-block-authorized';
import UserBlockNotAuthorized from '../user-block-not-authorized/user-block-not-authorized';

type HeaderProps = {
  showNav?: boolean;
}

function Header({ showNav }: HeaderProps): JSX.Element {
  const isLoggedIn = useSelector(getIsLoggedInStatus);

  const location = useLocation();
  const isMainScreen = location.pathname === AppRoute.Main;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={getClassNames(
                'header__logo-link',
                {'header__logo-link--active': isMainScreen},
              )}
              to={AppRoute.Main}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {showNav && (isLoggedIn ? <UserBlockAuthorized/> : <UserBlockNotAuthorized/>)}
        </div>
      </div>
    </header>
  );
}

export default Header;
