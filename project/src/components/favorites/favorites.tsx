import { connect, ConnectedProps } from 'react-redux';
import Header from '../header/header';
import FavoritesRoomCardList from '../favorites-room-card-list/favorites-room-card-list';
import { AuthorizationStatus } from '../../const';
import State from '../../types/state';

type FavoritesProps = {
  authorizationStatus: AuthorizationStatus;
}

const mapStateToProps = ({ offers }: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedFavoritesProps = PropsFromRedux & FavoritesProps;

function Favorites({ authorizationStatus, offers }: ConnectedFavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Header showNav authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesRoomCardList offers={offers}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export { Favorites };
export default connector(Favorites );
