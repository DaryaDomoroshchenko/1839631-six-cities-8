import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logoutAction } from '../../store/actions/api-actions/api-actions-auth';
import { getUserEmail } from '../../store/reducers/user-reducer/selectors';
import { ThunkAppDispatch } from '../../types/action';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  handleClick() {
    dispatch(logoutAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBlockAuthorized({ handleClick }: PropsFromRedux): JSX.Element {
  const userEmail = useSelector(getUserEmail);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
          </Link>
        </li>
        <li className="header__nav-item" onClick={handleClick}>
          <Link
            className="header__nav-link"
            to={AppRoute.Main}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { UserBlockAuthorized };
export default connector (UserBlockAuthorized);
