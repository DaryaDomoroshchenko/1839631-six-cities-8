import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthStatus } from '../../const';
import { State } from '../../types/state';
import UserBlockAuthorized from '../user-block-authorized/user-block-authorized';
import UserBlockNotAuthorized from '../user-block-not-authorized/user-block-not-authorized';

type HeaderProps = {
  showNav?: boolean;
}

const mapStateToProps = ({ USER }: State) => ({
  isLoggedIn: USER.authStatus === AuthStatus.auth,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedHeaderProps = PropsFromRedux & HeaderProps;

function Header({ showNav, isLoggedIn }: ConnectedHeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
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

export { Header };
export default connector (Header);
