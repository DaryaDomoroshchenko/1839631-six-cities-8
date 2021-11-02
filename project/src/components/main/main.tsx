import Header from '../header/header';
import { AuthorizationStatus } from '../../const';
import CityTabs from '../city-tabs/city-tabs';
import Cities from '../cities/cities';

type MainProps = {
  authorizationStatus: AuthorizationStatus;
}

function Main({ authorizationStatus }: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header showNav authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityTabs/>
        <Cities/>
      </main>
    </div>
  );
}

export default Main;
