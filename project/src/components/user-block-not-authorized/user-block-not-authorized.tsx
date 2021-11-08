import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function UserBlockNotAuthorized(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Login}
          >
            <span className="header__signout">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserBlockNotAuthorized;
